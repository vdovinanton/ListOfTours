using ListOfTours.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace ListOfTours.Repository
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }
    }
}
