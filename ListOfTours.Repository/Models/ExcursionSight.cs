using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ListOfTours.Repository.Models
{
    public class ExcursionSight
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Tour")]
        public int TourId { get; set; }

        public int OrderIndex { get; set; }

        public string Name { get; set; }

        public Tour Tour { get; set; }
    }
}
