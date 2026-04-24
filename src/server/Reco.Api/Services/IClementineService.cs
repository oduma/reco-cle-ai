using Reco.Api.Models;

namespace Reco.Api.Services;

public interface IClementineService
{
    Task<IReadOnlyList<LocalTrack>> LoadInventoryAsync(CancellationToken cancellationToken = default);
}
