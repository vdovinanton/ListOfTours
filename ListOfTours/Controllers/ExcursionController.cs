using ListOfTours.Core.Interfaces;
using ListOfTours.Core.Services;
using ListOfTours.Repository.Models;
using ListOfTours.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ListOfTours.Controllers
{
    [Route("api/[controller]")]
    public class ExcursionController : Controller
    {
        private readonly IExcursionService _excursionService;
        public ExcursionController(IExcursionService excursionService)
        {
            _excursionService = excursionService;
        }


        [HttpGet]
        [Route("{tourId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IEnumerable<ExcursionSight>> GetByTourIdAsync(int tourId)
        {
            return await _excursionService.GetByTourIdAsync(tourId);
        }
    }
}
