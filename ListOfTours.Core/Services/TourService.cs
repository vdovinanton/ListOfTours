using ListOfTours.Repository.Interfaces;
using ListOfTours.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using ListOfTours.Core.Interfaces;

namespace ListOfTours.Core.Services
{
    public class TourService : ITourService
    {
        private readonly ITourRepository _tours;

        public TourService(ITourRepository tours)
        {
            _tours = tours;
        }

        public IEnumerable<Tour> GetAll()
        {
            var tours = _tours.GetAll();

            //foreach (var excursion in tours.SelectMany(_ => _.ExcursionSights))
            //    excursion.Tour = null;

            return tours;
        }

        public async Task<Tour> CreateOrUpdateAsync(Tour tour)
        {
            var item = await _tours.CreateOrUpdateAsync(tour);

            return item;
        }
    }
}
