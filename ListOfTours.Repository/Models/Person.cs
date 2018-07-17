namespace ListOfTours.Models
{
    public class Person
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public Person()
        {
            // todo: make enum
            Role = "User";
        }
    }
}
