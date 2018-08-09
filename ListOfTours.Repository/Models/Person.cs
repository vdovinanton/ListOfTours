using System.ComponentModel.DataAnnotations;

namespace ListOfTours.Models
{
    public class Person
    {
        [Key]
        public int Id { get; set; }

        // IsUnique
        [Required]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        // todo: decode pwsd
        [Required]
        public string Password { get; set; }
        public string Role { get; set; }

        public Person()
        {
            // todo: make enum
            Role = "User";
        }
    }
}
