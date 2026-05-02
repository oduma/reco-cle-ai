using System.ComponentModel.DataAnnotations;

namespace Reco.Api.DTOs;

public record SetActiveReplyRequest([Required] int ReplyId);
