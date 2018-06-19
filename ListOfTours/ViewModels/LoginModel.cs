using System.ComponentModel.DataAnnotations;

namespace ListOfTours.ViewModels
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Not specified Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Not specified пароль")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
