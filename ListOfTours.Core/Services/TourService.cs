using ListOfTours.Repository.Interfaces;
using ListOfTours.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ListOfTours.Core.Services
{
    public interface ITourService
    {
        IEnumerable<Tour> GetAll();

        Tour CreateOrUpdate(Tour tour);
    }
    public class TourService : ITourService
    {
        private readonly ITourRepository _tours;

        // mock db
        private static List<Tour> _tourCollection = new List<Tour>()
            {
                new Tour { Name = "ATTRACTION BARCELONA", ClientName = "Rudenko A.", Date = DateTime.UtcNow },
                new Tour { Name = "ARTISTIC BARCELONA", ClientName = "Sadovnikova M.", Date = DateTime.UtcNow },
                new Tour { Name = "TOURIST BUS ONE DAY", ClientName = "Johanson Van A.", Date = DateTime.UtcNow },
                new Tour { Name = "BARCELONA HIGHLIGHTS", ClientName = "Petrov P.", Date = DateTime.UtcNow },
                new Tour { Name = "DAY TRIP TO PORTAVENTURA", ClientName = "Parker A.", Date = DateTime.UtcNow }
            };

        public TourService(ITourRepository tours)
        {
            _tours = tours;
        }

        public IEnumerable<Tour> GetAll()
        {
            return _tourCollection;
        }

        public Tour CreateOrUpdate(Tour tour)
        {
            var item = _tourCollection
                .FirstOrDefault(_ => _.Name == tour.Name);

            if (item == null)
            {
                _tourCollection.Add(tour);
            }
            else
            {
                item.Id = tour.Id;
                item.Name = tour.Name;
                item.ClientName = tour.ClientName;
                item.Date = tour.Date;
            }

            return item;
        }
    }
}
