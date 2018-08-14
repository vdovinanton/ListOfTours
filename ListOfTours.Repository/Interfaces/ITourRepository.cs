using ListOfTours.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ListOfTours.Repository.Interfaces
{
    public interface ITourRepository: IRepository<Tour>
    {
        Task<Tour> CreateOrUpdateAsync(Tour tour);

        Task<IEnumerable<Tour>> GetAllWithExcursionsAsync();
    }
}
