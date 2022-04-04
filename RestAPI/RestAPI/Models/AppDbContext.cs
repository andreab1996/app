using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Db.User> User { get; set; }
        public DbSet<Db.Permission> Permission { get; set; }
        public DbSet<Db.UserPermission> UserPermission { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Db.Permission>()
            //    .HasKey(c => c.Id);

            modelBuilder.Entity<Db.UserPermission>()
                .HasKey(e => new { e.UserId, e.PermissionId });

            modelBuilder.Entity<Db.UserPermission>()
                .HasOne<Db.User>(et => et.User)
                .WithMany(e => e.Permissions)
                .HasForeignKey(et => et.UserId);

            modelBuilder.Entity<Db.UserPermission>()
                .HasOne<Db.Permission>(et => et.Permission)
                .WithMany(e => e.Users)
                .HasForeignKey(et => et.PermissionId);
        }

    }
}
