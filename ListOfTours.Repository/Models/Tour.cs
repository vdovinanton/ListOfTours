﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ListOfTours.Repository.Models
{
    public class Tour
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string ClientName { get; set; }

        public DateTime Date { get; set; }

        public ICollection<ExcursionSight> ExcursionSights { get; set; }
    }
}
