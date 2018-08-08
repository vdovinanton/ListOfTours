using ListOfTours.Core.Services;
using ListOfTours.Repository.Models;
using ListOfTours.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public IActionResult Get()
        {
            var tours = _tourService.GetAll();

            return Json(new RequestResult
            {
                State = RequestState.Success,
                Data = new
                {
                    tours = tours
                }
            });
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public IActionResult CreateOrUpdate([FromBody]Tour tour)
        {
            var item = _tourService.CreateOrUpdate(tour);

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
