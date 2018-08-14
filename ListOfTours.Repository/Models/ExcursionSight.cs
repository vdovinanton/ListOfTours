using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ListOfTours.Repository.Models
{
    public class ExcursionSight
    {
        [Key]
        public int Id { get; set; }

        public int TourId { get; set; }

        public int OrderIndex { get; set; }

        public string Name { get; set; }

        [ForeignKey("TourId")]
        public virtual Tour Tour { get; set; }
    }
}
