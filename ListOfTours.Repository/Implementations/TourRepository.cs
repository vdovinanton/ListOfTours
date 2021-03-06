﻿using ListOfTours.Repository.Interfaces;
using ListOfTours.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Expressions;
using System;

namespace ListOfTours.Repository.Implementations
{
    public class TourRepository : Repository<Tour>, ITourRepository
    {
        private UserContext _db;
        public TourRepository(UserContext context) : base(context)
        {
            _db = context;
        }

        public async Task<IEnumerable<Tour>> GetAllWithExcursionsAsync()
        {
            return await Context
                .Set<Tour>()
                .AsNoTracking()
                .Include(_ => _.ExcursionSights)
                .ToListAsync();
        }

        private Tour SingleOrDefaultWithExcursionSights(Expression<Func<Tour, bool>> predicate)
        {
            return Context.Set<Tour>()
                .Include(_ => _.ExcursionSights)
                .SingleOrDefault(predicate);
        }

        public async Task<IEnumerable<Tour>> GetAvalible()
        {
            return await Context
                .Set<Tour>()
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Tour> CreateOrUpdateAsync(Tour tour)
        {
            var item = SingleOrDefaultWithExcursionSights(_ => _.Id == tour.Id);

            if (item == null)
            {
                _db.Tours.Add(tour);
            }
            else
            {
                item.Name = tour.Name;
                item.ClientName = tour.ClientName;
                item.Date = tour.Date;
                try
                {
                    foreach (var excursionSight in item.ExcursionSights)
                    {
                        excursionSight.Tour = null;
                        var first = tour.ExcursionSights.FirstOrDefault(unknown => unknown.Id == excursionSight.Id);
                        if (first != null)
                            excursionSight.OrderIndex = first
                                .OrderIndex;
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e); // should be logging
                    throw;
                }
            }

            await Context.SaveChangesAsync();

            return item;
        }
    }
}
