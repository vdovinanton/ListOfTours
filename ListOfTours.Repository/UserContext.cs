using ListOfTours.Models;
using ListOfTours.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace ListOfTours.Repository
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }

        public UserContext() : base()
        {
        }

        public DbSet<Person> Users { get; set; }

        public DbSet<Tour> Tours { get; set; }

        public DbSet<ExcursionSight> ExcursionSights { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Person>()
                 .HasIndex(u => u.Email)
                 .IsUnique();
        }
    }
}
