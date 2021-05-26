using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Bushware.Utilities;

namespace Bushware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ActionFilterLogger]
    public class CouriersController : ControllerBase
    {
        private readonly DeliveryDBContext _context;

        public CouriersController(DeliveryDBContext context)
        {
            _context = context;
        }

        // GET: api/Couriers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Courier>>> GetCouriers()
        {
            return await _context.Couriers.ToListAsync();
        }

        // DELETE: api/Couriers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourierById(int id)
        {
            var courier = await _context.Couriers.FindAsync(id);
            if (courier == null)
            {
                return NotFound();
            }

            _context.Couriers.Remove(courier);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
