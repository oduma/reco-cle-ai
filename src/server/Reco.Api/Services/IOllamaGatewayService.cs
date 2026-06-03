using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

/// <summary>
/// Marker interface for the Ollama LLM gateway — used for DI disambiguation.
/// Adds a model-overloaded recommendation method for selecting whisper vs. shout at call-time.
/// </summary>
public interface IOllamaGatewayService : ILLMGatewayService
{
    Task<MusicRecommendationResult> GetMusicRecommendationAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        string model,
        string? systemInstruction = null,
        CancellationToken cancellationToken = default);
}
