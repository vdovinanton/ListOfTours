using ListOfTours.Models;
using ListOfTours.Repository;
using ListOfTours.Repository.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ListOfTours.Utils
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var options = serviceProvider.GetRequiredService<IOptions<Person>>();
            var context = serviceProvider.GetRequiredService<UserContext>();
            context.Database.EnsureCreated();
            if (!context.Users.Any())
            {
                // users
                context.Users.Add(options.Value);

                // tours
                context.Tours.AddRange(
                    new Tour { Name = "ATTRACTION BARCELONA", ClientName = "Rudenko A.", Date = DateTime.UtcNow.AddDays(-1),
                        ExcursionSights = new List<ExcursionSight> {
                            new ExcursionSight { Name = "Carrer de Mallorca", OrderIndex = 1 },
                            new ExcursionSight { Name = "Sagrada Familia by Antonio Gaudí", OrderIndex = 2 },
                            new ExcursionSight { Name = "Las Ramblas", OrderIndex = 3 },
                            new ExcursionSight { Name = "The Magic Fountain of Montjuïc", OrderIndex = 4 },
                            new ExcursionSight { Name = "La Pedrera", OrderIndex = 5 }
                        }
                    },
                    new Tour { Name = "MUSEUM BARCELONA", ClientName = "Sadovnikova M.", Date = DateTime.UtcNow.AddDays(-2),
                        ExcursionSights = new List<ExcursionSight> {
                            new ExcursionSight { Name = "Picasso Museum", OrderIndex = 1 },
                            new ExcursionSight { Name = "Picasso Museum", OrderIndex = 2 },
                            new ExcursionSight { Name = "Miró Museum", OrderIndex = 3 },
                            new ExcursionSight { Name = "National Museum of Art of Catalunya", OrderIndex = 4 },
                            new ExcursionSight { Name = "Barcelona FC Museum", OrderIndex = 5 }
                        }
                    },
                    new Tour { Name = "TOURIST BUS ONE DAY", ClientName = "Johanson Van A.", Date = DateTime.UtcNow.AddDays(-3),
                        ExcursionSights = new List<ExcursionSight> {
                            new ExcursionSight { Name = "Placa Reial", OrderIndex = 1 },
                            new ExcursionSight { Name = "Park Güell", OrderIndex = 2 },
                            new ExcursionSight { Name = "Barrio Gotico", OrderIndex = 3 },
                            new ExcursionSight { Name = "Montjuic hill", OrderIndex = 4 },
                            new ExcursionSight { Name = "Tibidabo hill", OrderIndex = 5 }
                        }
                    },
                    new Tour { Name = "BARCELONA HIGHLIGHTS", ClientName = "Petrov P.", Date = DateTime.UtcNow.AddDays(-4),
                        ExcursionSights = null },
                    new Tour { Name = "DAY TRIP TO PORTAVENTURA", ClientName = "Parker A.", Date = DateTime.UtcNow.AddDays(-5),
                        ExcursionSights = null }
                    );

                //context.Tenants.Add(new Tenant() { Name = "Hello", Host = "hello", Style = "red.css" });
                //context.Tenants.Add(new Tenant() { Name = "Sample", Host = "sample", Style = "blue.css" });
                context.SaveChanges();
            }
        }
    }
}
