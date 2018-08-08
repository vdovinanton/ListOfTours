using ListOfTours.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ListOfTours.Repository.Interfaces
{
    /// <summary>
    /// Represents <see cref="Person"/> repository
    /// </summary>
    public interface IPersonRepository : IRepository<Person>
    {
        Person GetByEmail(string email);
    }
}
