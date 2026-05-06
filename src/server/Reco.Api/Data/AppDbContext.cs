using Microsoft.EntityFrameworkCore;
using Reco.Api.Data.Entities;

namespace Reco.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<SessionEventEntity> SessionEvents  { get; set; } = null!;
    public DbSet<AppSettingEntity>   AppSettings    { get; set; } = null!;
    public DbSet<SessionStateEntity> SessionState   { get; set; } = null!;
    public DbSet<DiaryEntryEntity>   DiaryEntries   { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SessionEventEntity>(e =>
        {
            e.ToTable("session_events");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasColumnName("id");
            e.Property(x => x.EventType).HasColumnName("event_type").IsRequired();
            e.Property(x => x.Timestamp).HasColumnName("timestamp").IsRequired();
            e.Property(x => x.UserLabel).HasColumnName("user_label").IsRequired().HasDefaultValue("me");
            e.Property(x => x.Content).HasColumnName("content");
            e.Property(x => x.Artist).HasColumnName("artist");
            e.Property(x => x.Album).HasColumnName("album");
            e.Property(x => x.Title).HasColumnName("title");
            e.Property(x => x.DurationSeconds).HasColumnName("duration_seconds");
            e.Property(x => x.IsActive).HasColumnName("is_active").IsRequired().HasDefaultValue(1);
            e.Property(x => x.ConversationBlock).HasColumnName("conversation_block");
            e.Property(x => x.Mood).HasColumnName("mood");
            e.HasIndex(x => x.IsActive).HasDatabaseName("idx_se_is_active");
            e.HasIndex(x => x.ConversationBlock).HasDatabaseName("idx_se_conversation_block");
        });

        modelBuilder.Entity<AppSettingEntity>(e =>
        {
            e.ToTable("app_settings");
            e.HasKey(x => x.Key);
            e.Property(x => x.Key).HasColumnName("key");
            e.Property(x => x.Value).HasColumnName("value").IsRequired();
            e.Property(x => x.UpdatedAt).HasColumnName("updated_at").IsRequired();
        });

        modelBuilder.Entity<SessionStateEntity>(e =>
        {
            e.ToTable("session_state");
            e.HasKey(x => x.Key);
            e.Property(x => x.Key).HasColumnName("key");
            e.Property(x => x.Value).HasColumnName("value");
        });

        modelBuilder.Entity<DiaryEntryEntity>(e =>
        {
            e.ToTable("diary_entries");
            e.HasKey(x => x.Date);
            e.Property(x => x.Date).HasColumnName("date");
            e.Property(x => x.Content).HasColumnName("content").IsRequired();
            e.Property(x => x.CreatedAt).HasColumnName("created_at").IsRequired();
        });
    }
}
