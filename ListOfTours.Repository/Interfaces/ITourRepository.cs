using ListOfTours.Repository.Models;
using System.Threading.Tasks;

namespace ListOfTours.Repository.Interfaces
{
    public interface ITourRepository: IRepository<Tour>
    {
        Task<Tour> CreateOrUpdateAsync(Tour tour);
    }
}
