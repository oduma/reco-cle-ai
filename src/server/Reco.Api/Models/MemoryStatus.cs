namespace Reco.Api.Models;

public record MemoryStatus(int Used, int Total)
{
    public double FillRatio => Total > 0 ? (double)Used / Total : 0;
}
