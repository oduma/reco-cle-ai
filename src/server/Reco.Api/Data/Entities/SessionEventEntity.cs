namespace Reco.Api.Data.Entities;

public class SessionEventEntity
{
    public int     Id                { get; set; }
    public string  EventType         { get; set; } = "";
    public string  Timestamp         { get; set; } = "";
    public string  UserLabel         { get; set; } = "me";
    public string? Content           { get; set; }
    public string? Artist            { get; set; }
    public string? Album             { get; set; }
    public string? Title             { get; set; }
    public double? DurationSeconds   { get; set; }
    public int     IsActive          { get; set; } = 1;
    public int?    ConversationBlock { get; set; }
    public string? Mood              { get; set; }
}
