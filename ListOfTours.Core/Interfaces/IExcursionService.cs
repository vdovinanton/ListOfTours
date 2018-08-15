using ListOfTours.Repository.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ListOfTours.Core.Interfaces
{
    public interface IExcursionService
    {
        Task<IEnumerable<ExcursionSight>> GetByTourIdAsync(int tourId);
    }
}
