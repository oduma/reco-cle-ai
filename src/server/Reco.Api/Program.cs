using Microsoft.EntityFrameworkCore;
using Reco.Api.Data;
using Reco.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Settings infrastructure — registered first so all downstream services can use IAppSettingsService
builder.Services.AddSingleton<IAppSettingsRepository, AppSettingsRepository>();
builder.Services.AddSingleton<IAppSettingsService, AppSettingsService>();
builder.Services.AddSingleton<IAiPromptService, AiPromptService>();

builder.Services.AddSingleton<ISessionHistoryRepository, SessionHistoryRepository>();
builder.Services.AddSingleton<ISessionHistoryService, SessionHistoryService>();
builder.Services.AddSingleton<ISessionContextBuilder, SessionContextBuilder>();
builder.Services.AddSingleton<IPromptSetRepository, PromptSetRepository>();
builder.Services.AddSingleton<IPromptSetService, PromptSetService>();

builder.Services.AddHttpClient<GeminiGatewayService>();
builder.Services.AddScoped<IGeminiGatewayService>(sp => sp.GetRequiredService<GeminiGatewayService>());

builder.Services.AddHttpClient<OllamaGatewayService>(client =>
{
    // CPU inference on a local model can take several minutes — give it room
    client.Timeout = TimeSpan.FromMinutes(5);
});
builder.Services.AddScoped<IOllamaGatewayService>(sp => sp.GetRequiredService<OllamaGatewayService>());

builder.Services.AddHttpClient<LastFmGatewayService>();
builder.Services.AddSingleton<IClementineService, ClementineService>();
builder.Services.AddSingleton<IClementineLauncherService, ClementineLauncherService>();
builder.Services.AddSingleton<ILastFmGatewayService, LastFmGatewayService>();
builder.Services.AddSingleton<ISuggestionCacheService, SuggestionCacheService>();
builder.Services.AddSingleton<ITrackEnrichmentService, TrackEnrichmentService>();
builder.Services.AddScoped<IRecommendationOrchestrationService, RecommendationOrchestrationService>();
builder.Services.AddScoped<IDiaryRepository, DiaryRepository>();
builder.Services.AddScoped<IDiaryService, DiaryService>();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    var dbPath = builder.Configuration["REASONIC_DB_PATH"] ?? "reasonic.db";
    options.UseSqlite($"Data Source={dbPath}");
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddHealthChecks();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularDevPolicy", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// ── Schema ────────────────────────────────────────────────────────────────────
// Apply any pending EF Core migrations (creates schema on fresh installs; runs new migrations on upgrades).
await using (var scope = app.Services.CreateAsyncScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await DatabaseBaseline.StampIfNeededAsync(db);
    await db.Database.MigrateAsync();
}

// ── Settings seeding ─────────────────────────────────────────────────────────
// Build the combined defaults dict: app-setting defaults + AI prompt defaults.
var allDefaults = new Dictionary<string, string>(
    AppSettingDefaults.All,
    StringComparer.OrdinalIgnoreCase);
foreach (var (k, v) in AiPromptDefaults.All)
    allDefaults[k] = v;

var repo = app.Services.GetRequiredService<IAppSettingsRepository>();

// 1. Write canonical defaults to app_setting_defaults (always UPSERT — updates on version upgrades).
await repo.WriteDefaultsAsync(allDefaults);

// 2. Seed app_settings (INSERT OR IGNORE) so every non-secret setting has a DB row.
//    Existing user overrides are never touched.
await repo.SeedDefaultsAsync(allDefaults);

// 3. One-time migration: seed API keys and machine-specific paths from env vars into app_settings.
//    Once present in the DB, env vars for these are no longer required.
var secretsToSeed = new[] { "GEMINI_API_KEY", "LASTFM_API_KEY", "CLEMENTINE_DB_PATH" };
foreach (var key in secretsToSeed)
{
    var envValue = app.Configuration[key];
    if (!string.IsNullOrWhiteSpace(envValue))
        await repo.SeedDefaultsAsync(
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) { [key] = envValue });
}

// ── Startup checks ────────────────────────────────────────────────────────────
// Check the effective runtime value (DB + env var fallback) so the warning is accurate
// even when the key was just seeded from an env var above.
var settings = app.Services.GetRequiredService<IAppSettingsService>();

var geminiKey = await settings.GetStringAsync("GEMINI_API_KEY", "");
if (string.IsNullOrWhiteSpace(geminiKey))
{
    app.Logger.LogWarning(
        "GEMINI_API_KEY is not set. Configure it via the in-app settings panel " +
        "or set GEMINI_API_KEY in .env.local for the first run. " +
        "All chat requests will fail until it is configured.");
}
else
{
    app.Logger.LogInformation("GEMINI_API_KEY configured (starts with: {Prefix}…)", geminiKey[..4]);
}

var clementineDbPath = await settings.GetStringAsync("CLEMENTINE_DB_PATH", "");
if (string.IsNullOrWhiteSpace(clementineDbPath) || !File.Exists(clementineDbPath))
{
    app.Logger.LogWarning(
        "Clementine database copy not found at {Path}. " +
        "Local library filtering will be unavailable until configured via the settings panel.",
        string.IsNullOrWhiteSpace(clementineDbPath) ? "(not set)" : clementineDbPath);
}
else
{
    app.Logger.LogInformation("Clementine database copy found at {Path}", clementineDbPath);
}

// ── Middleware ────────────────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("AngularDevPolicy");
    app.UseHttpsRedirection();
}

// Serve the Angular app from wwwroot (production deployment)
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health");

// SPA fallback: any unmatched route returns index.html so Angular routing works
app.MapFallbackToFile("index.html");

app.Run();

// Exposed for WebApplicationFactory in integration tests
public partial class Program { }
