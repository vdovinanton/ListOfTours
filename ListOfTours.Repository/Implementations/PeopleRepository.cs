using ListOfTours.Models;
using ListOfTours.Repository.Interfaces;

namespace ListOfTours.Repository.Implementations
{
    public class PeopleRepository : Repository<Person>, IPersonRepository
    {
        private UserContext _people;
        public PeopleRepository(UserContext context) : base(context)
        {
            _people = context;
        }
    }
}
