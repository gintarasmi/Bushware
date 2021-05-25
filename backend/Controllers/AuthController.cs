using Bushware.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Bushware.Controllers
{

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly DeliveryDBContext _context;

        private readonly IJwtService _jwt;

        public AuthController(IJwtService jwt, DeliveryDBContext context)
        {
            _jwt = jwt;
            _context = context;
        }

        public record LoginRequest(string email, string password, bool isCourier);

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginRequest req)
        {
            MethodLogger.GetInstance().ToLog(2, this.GetType().Name, MethodLogger.GetCurrentMethod());
            using var ctx = _context;
            if (!req.isCourier)
            {
                var cust = ctx.Customers.FirstOrDefault(c => c.Email == req.email);
                if (cust == null || cust.Password != req.password)
                {
                    return Unauthorized("Password or email is incorrect");
                }

                return Ok(_jwt.CreateToken(new UserInfo(cust.Id)));
            }

            var cour = ctx.Couriers.FirstOrDefault(c => c.Email == req.email);
            if (cour == null || cour.Password != req.password)
            {
                return Unauthorized("Password or email is incorrect");
            }

            return Ok(_jwt.CreateToken(new UserInfo(cour.Id, Courier: true)));
        }

        public record RegistrationRequest(string Name, string Email, string Password, bool isCourier);

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RegistrationRequest req)
        {
            MethodLogger.GetInstance().ToLog(2, this.GetType().Name, MethodLogger.GetCurrentMethod());
            Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (req.Password.Length < 6)
                return BadRequest("Password too short (6 characters minimum)");

            if (req.Password.Length > 32)
                return BadRequest("Password too short (32 characters maximum)");

            if (req.Name.Length < 3)
                return BadRequest("Please enter your full name");

            if (req.Name.Length > 256)
                return BadRequest("Name too long (256 characters maximum)");

            // TODO: proper email validation
            if (req.Email.Length > 256 || !req.Email.Contains('@'))
                return BadRequest("Invalid email");

            using var ctx = _context;

            if (!req.isCourier)
            {
                var cust = ctx.Customers.FirstOrDefault(c => c.Email == req.Email);

                if (cust != null)
                    return BadRequest("User with this email already exists");

                // TODO: password hashing
                var newCust = ctx.Customers.Add(new Customer()
                {
                    Name = req.Name,
                    Email = req.Email,
                    Password = req.Password
                });
            }
            else
            {
                var cour = ctx.Couriers.FirstOrDefault(c => c.Email == req.Email);

                if (cour != null)
                    return BadRequest("Courier with this email already exists");

                // TODO: password hashing
                var newCour = ctx.Couriers.Add(new Courier()
                {
                    Name = req.Name,
                    Email = req.Email,
                    Password = req.Password
                });
            }
            ctx.SaveChanges();

            return Ok();
        }
    }
}
