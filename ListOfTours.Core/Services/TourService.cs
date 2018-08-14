using ListOfTours.Repository.Interfaces;
using ListOfTours.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace ListOfTours.Core.Services
{
    public interface ITourService
    {
        Task<Tour> CreateOrUpdateAsync(Tour tour);

        Task<IEnumerable<Tour>> GetAllWithExcursionsAsync();
    }
    public class TourService : ITourService
    {
        private readonly ITourRepository _tours;

        public TourService(ITourRepository tours)
        {
            _tours = tours;
        }

        public async Task<IEnumerable<Tour>> GetAllWithExcursionsAsync()
        {
            var tours = await _tours.GetAllWithExcursionsAsync();

            foreach (var excursion in tours.SelectMany(_ => _.ExcursionSights))
                excursion.Tour = null;

            return tours;
        }

        public async Task<Tour> CreateOrUpdateAsync(Tour tour)
        {
            var item = await _tours.CreateOrUpdateAsync(tour);

            return item;
        }
    }
}
