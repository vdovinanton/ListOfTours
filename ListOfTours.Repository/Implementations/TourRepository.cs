using ListOfTours.Repository.Interfaces;
using ListOfTours.Repository.Models;

namespace ListOfTours.Repository.Implementations
{
    public class TourRepository : Repository<Tour>, ITourRepository
    {
        private UserContext _db;
        public TourRepository(UserContext context) : base(context)
        {
            _db = context;
        }
    }
}
