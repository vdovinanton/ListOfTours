using ListOfTours.Repository.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ListOfTours.Core.Interfaces
{
    public interface ITourService
    {
        Task<Tour> CreateOrUpdateAsync(Tour tour);

        IEnumerable<Tour> GetAll();
    }
}
