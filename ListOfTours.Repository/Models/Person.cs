namespace ListOfTours.Models
{
    public class Person
    {
        public int ID { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public Person()
        {
            // todo: make enum
            Role = "User";
        }
    }
}
