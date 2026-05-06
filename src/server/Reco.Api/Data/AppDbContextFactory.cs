using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Reco.Api.Data;

// Used only by "dotnet ef migrations add" at design time — not wired into the DI container.
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite("Data Source=reasonic.db")
            .Options;
        return new AppDbContext(options);
    }
}
