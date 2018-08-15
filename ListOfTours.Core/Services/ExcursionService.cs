using ListOfTours.Core.Interfaces;
using ListOfTours.Repository.Interfaces;
using ListOfTours.Repository.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ListOfTours.Core.Services
{
    
    public class ExcursionService : IExcursionService
    {
        private readonly IExcursionRepository _repository;
        public ExcursionService(IExcursionRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ExcursionSight>> GetByTourIdAsync(int tourId)
        {
            return await _repository.GetByTourId(tourId);
        }
    }
}
