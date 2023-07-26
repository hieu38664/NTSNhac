using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Model.Entities
{
    public partial class ApiContext : DbContext
    {
        public ApiContext()
        {
        }

        public ApiContext(DbContextOptions<ApiContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Nhac> Nhac { get; set; } = null!;
        public virtual DbSet<NhacAttach> NhacAttach { get; set; } = null!;
        public virtual DbSet<__MigrationHistory> __MigrationHistory { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=4438C\\SQLEXPRESS;Database=NTSNhac;User Id=sa;Password=123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Nhac>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(36)
                    .IsUnicode(false);

                entity.Property(e => e.Tgian    ).HasColumnType("datetime");

                entity.Property(e => e.FileId)
                    .HasMaxLength(36)
                    .IsUnicode(false);

                entity.Property(e => e.NgayPhat).HasColumnType("datetime");

                entity.Property(e => e.ThoigianPhat).HasMaxLength(50);
            });

            modelBuilder.Entity<NhacAttach>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(36)
                    .IsUnicode(false);

                entity.Property(e => e.FileName).HasMaxLength(200);

                entity.Property(e => e.FileSize).HasMaxLength(200);

                entity.Property(e => e.Path)
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<__MigrationHistory>(entity =>
            {
                entity.HasKey(e => new { e.MigrationId, e.ContextKey })
                    .HasName("PK_dbo.__MigrationHistory");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ContextKey).HasMaxLength(300);

                entity.Property(e => e.ProductVersion).HasMaxLength(32);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
