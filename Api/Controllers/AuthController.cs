using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Api.Data.Models;
using Api.Data;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDBContext _dbContext;

        public AuthController(IConfiguration configuration, ApplicationDBContext context)
        {
            _configuration = configuration;
            _dbContext = context;
        }
        
        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] UserViewModel value)
        {
            if (value.Username=="" || value.Password=="")
            {
                return BadRequest("Please enter your Username and Password");
            }
            var user = new User
            {
                Username = value.Username,
                Password = value.Password
            };
            _dbContext.Users.Add(user);
            var result = _dbContext.SaveChanges();
             return Ok(new { Username = user.Username });
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] UserViewModel value)
        {
            var user = _dbContext.Users.Where(c => c.Username == value.Username && c.Password==value.Password).SingleOrDefault();
            if (user != null)
            {
                var claim = new[] {
                    new Claim("Username", user.Username)
                };

                var signinKey = new SymmetricSecurityKey(
                  Encoding.UTF8.GetBytes(_configuration["Jwt:SigningKey"]));

                int expiryInMinutes = Convert.ToInt32(_configuration["Jwt:ExpiryInMinutes"]);

                var token = new JwtSecurityToken(
                  issuer: _configuration["Jwt:Site"],
                  audience: _configuration["Jwt:Site"],
                  claims: claim,
                  expires: DateTime.UtcNow.AddMinutes(expiryInMinutes),
                  signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
                );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                }); ;
            }
            else
            {
                return BadRequest("Invalid Username and Password");
            }
              
        }

    }
}