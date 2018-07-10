using ListOfTours.Models;
using ListOfTours.Repository.Interfaces;
using Microsoft.Extensions.Options;
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
        private readonly Person _admin;
        public PersonService(IPersonRepository people, IOptions<Person> options)
        {
            _people = people;
            _admin = options.Value;
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
            if (_admin == null)
                throw new System.NullReferenceException(nameof(_admin));

            _people.Add(_admin);
            _people.Complete();
        }
    }
}
