namespace Reco.Api.DTOs;

public record UpdateSettingsRequest(IReadOnlyDictionary<string, string?> Settings);
