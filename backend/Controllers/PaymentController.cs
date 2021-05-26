using System.Collections.Generic;
using System.Threading.Tasks;
using Bushware.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bushware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ActionFilterLogger]
    public class PaymentController : ControllerBase
    {
        private readonly DeliveryDBContext _context;

        public PaymentController(DeliveryDBContext context)
        {
            _context = context;
        }

        // GET: api/Payments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            return await _context.Payments.ToListAsync();
        }

        // POST: api/Payments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Payment>> PostPayment(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayments", new { id = payment.Id }, payment);
        }


        // DELETE: api/Payments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}

