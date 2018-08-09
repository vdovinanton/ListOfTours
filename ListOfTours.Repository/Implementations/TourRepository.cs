using ListOfTours.Repository.Interfaces;
using ListOfTours.Repository.Models;
using System.Threading.Tasks;

namespace ListOfTours.Repository.Implementations
{
    public class TourRepository : Repository<Tour>, ITourRepository
    {
        private UserContext _db;
        public TourRepository(UserContext context) : base(context)
        {
            _db = context;
        }

        public async Task<Tour> CreateOrUpdateAsync(Tour tour)
        {
            var item = SingleOrDefault(_ => _.Name == tour.Name);

            if (item == null)
            {
                _db.Tours.Add(tour);
            }
            else
            {
                item.Name = tour.Name;
                item.ClientName = tour.ClientName;
                item.Date = tour.Date;
            }

            await Context.SaveChangesAsync();

            return item;
        }
    }
}
