using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using Bushware.Utilities;

namespace Bushware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ActionFilterLogger]
    public class CustAddressController : ControllerBase
    {

        private readonly DeliveryDBContext _context;

        public CustAddressController(DeliveryDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAdresses()
        {
            return await _context.Addresses.ToListAsync();
        }

        [HttpPost]
        [Authorize(Policy = "user")]
        public async Task<ActionResult<Address>> PostCustAddress(Address address)
        {
            address.CustomerId = int.Parse(User.Identity.Name);
            Console.WriteLine(address);
            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdresses", new { id = address.Id }, address);
        }


        // GET: api/CustAddress/ByCustomerId/5
        [HttpGet("ByCustomerId/{id}")]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddressByCustomerId(int id)
        {
            var orders = await _context.Addresses.Where(o => o.CustomerId == id).ToListAsync();

            if (orders == null)
            {
                return NotFound();
            }

            return orders;
        }

        // GET: api/Orders/MyOrders
        [HttpGet("MyAddresses")]
        [Authorize(Policy = "user")]
        public async Task<ActionResult<IEnumerable<Address>>> GetMyAddresses()
        {
            return await GetAddressByCustomerId(int.Parse(User.Identity.Name));
        }
    }
}

