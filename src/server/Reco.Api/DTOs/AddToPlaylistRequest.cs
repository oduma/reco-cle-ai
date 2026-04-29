using System.ComponentModel.DataAnnotations;

namespace Reco.Api.DTOs;

public class AddToPlaylistRequest
{
    [Required, MinLength(1)]
    public List<string> FilePaths { get; set; } = [];
}
