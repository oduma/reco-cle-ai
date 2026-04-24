using Reco.Api.Configuration;
using Reco.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Bind Gemini options — reads GEMINI_API_KEY, GEMINI_MODEL, GEMINI_BASE_URL env vars
// as well as the "Gemini" section from appsettings.json for non-secret defaults.
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

builder.Services.AddHttpClient<IGeminiGatewayService, GeminiGatewayService>();

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

// Fail fast with a clear message if the API key is missing
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

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("AngularDevPolicy");
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health");

app.Run();

// Exposed for WebApplicationFactory in integration tests
public partial class Program { }
