using System.ComponentModel.DataAnnotations;

namespace Reco.Api.DTOs;

public record DiaryEntryRequest(
    [Required] string Date,
    bool Force = false
);
