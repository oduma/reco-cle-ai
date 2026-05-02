namespace Reco.Api.DTOs;

public record SettingsEntry(string Key, string? Value);

public record SettingsResponse(IReadOnlyList<SettingsEntry> Settings);
