using Reco.Api.Configuration;
using Reco.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<GeminiOptions>(options =>
{
    builder.Configuration.GetSection(GeminiOptions.SectionName).Bind(options);

    var apiKey = builder.Configuration["GEMINI_API_KEY"];
    if (!string.IsNullOrWhiteSpace(apiKey)) options.ApiKey = apiKey;

    var model = builder.Configuration["GEMINI_MODEL"];
    if (!string.IsNullOrWhiteSpace(model)) options.Model = model;

    var baseUrl = builder.Configuration["GEMINI_BASE_URL"];
    if (!string.IsNullOrWhiteSpace(baseUrl)) options.BaseUrl = baseUrl;
});

builder.Services.Configure<RecommendationOptions>(options =>
{
    builder.Configuration.GetSection(RecommendationOptions.SectionName).Bind(options);

    if (int.TryParse(builder.Configuration["RECOMMENDATION_MIN_TRACKS"], out var min) && min > 0)
        options.MinTracks = min;

    if (int.TryParse(builder.Configuration["RECOMMENDATION_MAX_TRACKS"], out var max) && max > 0)
        options.MaxTracks = max;
});

builder.Services.Configure<ClementineOptions>(options =>
{
    builder.Configuration.GetSection(ClementineOptions.SectionName).Bind(options);

    var dbPath = builder.Configuration["CLEMENTINE_DB_PATH"];
    if (!string.IsNullOrWhiteSpace(dbPath)) options.DbPath = dbPath;

    if (double.TryParse(builder.Configuration["CLEMENTINE_MATCH_THRESHOLD"], out var threshold) && threshold > 0)
        options.MatchThreshold = threshold;
});

builder.Services.AddHttpClient<IGeminiGatewayService, GeminiGatewayService>();
builder.Services.AddSingleton<IClementineService, ClementineService>();
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

var geminiKey = app.Configuration["GEMINI_API_KEY"];
if (string.IsNullOrWhiteSpace(geminiKey))
{
    app.Logger.LogWarning(
        "GEMINI_API_KEY is not set. Set it as an environment variable before starting the API. " +
        "All chat requests will return 403 until it is configured.");
}
else
{
    app.Logger.LogInformation("GEMINI_API_KEY loaded (starts with: {Prefix}…)", geminiKey[..4]);
}

var clementineDbPath = app.Configuration["CLEMENTINE_DB_PATH"]
    ?? app.Configuration["Clementine:DbPath"]
    ?? @"C:\Code\clementine.db";

if (!File.Exists(clementineDbPath))
{
    app.Logger.LogWarning(
        "Clementine database copy not found at {Path}. " +
        "Local library filtering will be unavailable until the file is placed at the configured path. " +
        "Set CLEMENTINE_DB_PATH to override the location.",
        clementineDbPath);
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
