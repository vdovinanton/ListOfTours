using ListOfTours.Core.Interfaces;
using ListOfTours.Repository.Models;
using ListOfTours.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ListOfTours.Controllers
{
    [Route("api/[controller]")]
    public class TourController : Controller
    {
        private readonly ITourService _tourService;
        public TourController(ITourService tourService)
        {
            _tourService = tourService;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IEnumerable<Tour> Get()
        {
            return _tourService.GetAll();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CreateOrUpdate([FromBody]Tour tour)
        {
            var item = await _tourService.CreateOrUpdateAsync(tour);

            return Json(new RequestResult
            {
                State = RequestState.Success,
                Data = new
                {
                    tour = item
                }
            });
        }
    }
}
