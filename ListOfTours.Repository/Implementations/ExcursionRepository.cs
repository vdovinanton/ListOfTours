using ListOfTours.Repository.Interfaces;
using ListOfTours.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListOfTours.Repository.Implementations
{
    public class ExcursionRepository : Repository<ExcursionSight>, IExcursionRepository
    {
        private UserContext _db;
        public ExcursionRepository(UserContext context) : base(context)
        {
            _db = context;
        }

        public async Task<IEnumerable<ExcursionSight>> GetByTourId(int tourId)
        {
            return await Context
                .Set<ExcursionSight>()
                .AsNoTracking()
                .Where(_ => _.TourId == tourId)
                .ToListAsync();
        }
    }
}
