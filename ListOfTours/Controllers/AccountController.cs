using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using ListOfTours.ViewModels;
using ListOfTours.Models;
using ListOfTours.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ListOfTours.Core.Services;

namespace ListOfTours.Controllers
{
    public class AccountController : Controller
    {
        private readonly IPersonService _personService;
        public AccountController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpPost("/token")]
        public IActionResult Login([FromBody]Person person)
        {
            var existUser = _personService.Get(person);

            if (existUser != null)
            {
                var requestAt = DateTime.Now;
                var expiresIn = requestAt + AuthOptions.ExpiresSpan;
                var token = GenerateToken(existUser, expiresIn);

                return Json(new RequestResult
                {
                    State = RequestState.Success,
                    Data = new
                    {
                        requertAt = requestAt,
                        expiresIn = AuthOptions.ExpiresSpan.TotalSeconds,
                        tokeyType = AuthOptions.TokenType,
                        accessToken = token
                    }
                });
            }
            else
            {
                return Json(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Username or password is invalid"
                });
            }
        }

        private string GenerateToken(Person user, DateTime expires)
        {
            var handler = new JwtSecurityTokenHandler();

            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(user.Login, "TokenAuth"),
                new[] { new Claim("ID", user.ID.ToString()) }
            );

            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = AuthOptions.Issuer,
                Audience = AuthOptions.Audience,
                SigningCredentials = AuthOptions.SigningCredentials,
                Subject = identity,
                Expires = expires
            });
            return handler.WriteToken(securityToken);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public IActionResult GetUserInfo()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            return Json(new RequestResult
            {
                State = RequestState.Success,
                Data = new { UserName = claimsIdentity.Name }
            });
        }
    }
}
