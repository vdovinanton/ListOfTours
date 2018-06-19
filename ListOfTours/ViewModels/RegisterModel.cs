using System.ComponentModel.DataAnnotations;

namespace ListOfTours.ViewModels
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Not specified Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Not specified Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Password did type not correct")]
        public string ConfirmPassword { get; set; }
    }
}
