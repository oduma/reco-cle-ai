using Reco.Api.Models;

namespace Reco.Api.Services;

public interface ISessionContextBuilder
{
    /// <summary>
    /// Loads active session events, reconstructs conversation history, and builds the temporal
    /// preamble string to prepend to the current user prompt. Returns empty history and null
    /// preamble when the session log is empty.
    /// </summary>
    Task<SessionContext> BuildAsync(CancellationToken cancellationToken = default);
}
