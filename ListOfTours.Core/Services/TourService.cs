using ListOfTours.Repository.Interfaces;
using ListOfTours.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ListOfTours.Core.Services
{
    public interface ITourService
    {
        IEnumerable<Tour> GetAll();

        Task<Tour> CreateOrUpdateAsync(Tour tour);
    }
    public class TourService : ITourService
    {
        private readonly ITourRepository _tours;

        public TourService(ITourRepository tours)
        {
            _tours = tours;
        }

        public IEnumerable<Tour> GetAll()
        {
            return _tours.GetAll();
        }

        public async Task<Tour> CreateOrUpdateAsync(Tour tour)
        {
            var item = await _tours.CreateOrUpdateAsync(tour);

            return item;
        }
    }
}
