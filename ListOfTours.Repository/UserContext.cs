using ListOfTours.Models;
using Microsoft.EntityFrameworkCore;

namespace ListOfTours.Repository
{
    public class UserContext : DbContext
    {
        public DbSet<Person> Users { get; set; }
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }

        public UserContext() : base()
        {

        }
    }
}
