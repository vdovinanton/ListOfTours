using ListOfTours.Models;
using ListOfTours.Repository.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace ListOfTours.Core.Services
{
    public interface IPersonService
    {
        Person Get(Person person);
        ICollection<Person> GetAll();
    }
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _people;
        public PersonService(IPersonRepository people)
        {
            _people = people;

            if (!GetAll().Any()) AddMockUser();
        }
        public Person Get(Person person)
        {
            return _people.SingleOrDefault(_ => person.Login == _.Login && person.Password == _.Password);
        }

        public ICollection<Person> GetAll()
        {
            return _people.GetAll().ToList();
        }

        /// <summary>
        /// if users schema is empty then create root user
        /// </summary>
        private void AddMockUser()
        {
            var person = new Person { Login = "root", Password = "root" };
            _people.Add(person);
        }
    }
}
