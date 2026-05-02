using Reco.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Settings infrastructure — registered first so all downstream services can use IAppSettingsService
builder.Services.AddSingleton<IAppSettingsRepository, AppSettingsRepository>();
builder.Services.AddSingleton<IAppSettingsService, AppSettingsService>();

builder.Services.AddSingleton<ISessionHistoryRepository, SessionHistoryRepository>();
builder.Services.AddSingleton<ISessionHistoryService, SessionHistoryService>();
builder.Services.AddSingleton<ISessionContextBuilder, SessionContextBuilder>();

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

// Ensure the Reasonic SQLite database and all tables exist (session events + app_settings)
await app.Services
    .GetRequiredService<ISessionHistoryRepository>()
    .EnsureCreatedAsync();

var geminiKey = app.Configuration["GEMINI_API_KEY"];
if (string.IsNullOrWhiteSpace(geminiKey))
{
    app.Logger.LogWarning(
        "GEMINI_API_KEY is not set. Set it as an environment variable or via the settings panel. " +
        "All chat requests will fail until it is configured.");
}
else
{
    app.Logger.LogInformation("GEMINI_API_KEY loaded (starts with: {Prefix}…)", geminiKey[..4]);
}

var clementineDbPath = app.Configuration["CLEMENTINE_DB_PATH"];
if (string.IsNullOrWhiteSpace(clementineDbPath) || !File.Exists(clementineDbPath))
{
    app.Logger.LogWarning(
        "Clementine database copy not found at {Path}. " +
        "Local library filtering will be unavailable until the file is placed at the configured path. " +
        "Set CLEMENTINE_DB_PATH via environment variable or the settings panel.",
        clementineDbPath ?? "(not set)");
}
else
{
    app.Logger.LogInformation("Clementine database copy found at {Path}", clementineDbPath);
}

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
