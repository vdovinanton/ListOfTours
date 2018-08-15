using ListOfTours.Repository.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ListOfTours.Repository.Interfaces
{
    public interface IExcursionRepository : IRepository<ExcursionSight>
    {
        Task<IEnumerable<ExcursionSight>> GetByTourId(int tourId);
    }
}
