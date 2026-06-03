using Reco.Api.Models;

namespace Reco.Api.Services;

public interface IPromptSetService
{
    Task<IReadOnlyList<PromptSet>> GetAllAsync();
    Task<PromptSet?> GetByNameAsync(string name);
    Task<PromptSet?> GetByIdAsync(int id);
    Task<PromptSet> CreateAsync(string name, bool useSession, string recommendationPrompt);
    Task<PromptSet> UpdateAsync(int id, string name, bool useSession, string recommendationPrompt);
    Task DeleteAsync(int id);
    Task<string> GetActivePromptSetNameAsync();
    Task SetActivePromptSetNameAsync(string name);
}
