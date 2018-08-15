using ListOfTours.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ListOfTours.Core.Interfaces
{
    public interface IPersonService
    {
        Person Get(Person person);
        ICollection<Person> GetAll();
        void Create(Person person);
        Person Get(string email);
    }
}
