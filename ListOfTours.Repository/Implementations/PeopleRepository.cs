using ListOfTours.Models;
using ListOfTours.Repository.Interfaces;

namespace ListOfTours.Repository.Implementations
{
    public class PeopleRepository : Repository<Person>, IPersonRepository
    {
        private UserContext _db;
        public PeopleRepository(UserContext context) : base(context)
        {
            _db = context;
        }

        public Person GetByEmail(string email)
        {
            return SingleOrDefault(_ => _.Email.Equals(email));
        }
    }
}
