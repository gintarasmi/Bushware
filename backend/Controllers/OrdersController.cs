using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Bushware.Utilities;
using System;

namespace Bushware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ActionFilterLogger]
    public class OrdersController : ControllerBase
    {
        private readonly DeliveryDBContext _context;

        public OrdersController(DeliveryDBContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // GET: api/Orders/ByCustomerId/5
        [HttpGet("ByCustomerId/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrderByCustomerId(int id)
        {
            var orders = await _context.Orders.Where(o => o.CustomerId == id).ToListAsync();

            if (orders == null)
            {
                return NotFound();
            }

            return orders;
        }

        // GET: api/Orders/MyOrders
        //[HttpGet("MyOrders")]
        //[Authorize(Policy = "user")]
        //public async Task<ActionResult<IEnumerable<Order>>> GetMyOrders()
        //{
        //    MethodLogger.GetInstance().ToLog(2, this.GetType().Name, MethodLogger.GetCurrentMethod(), User.Identity.Name, User.Identity.AuthenticationType);
        //    return await GetOrderByCustomerId(int.Parse(User.Identity.Name));
        //}

        [HttpGet("MyOrders")]
        [Authorize(Policy = "user")]
        public async Task<ActionResult> GetMyOrders()
        {
            using var ctx = _context;
            var shipments_query = await (from order in ctx.Orders
                                         join package in ctx.Packages on order.Package equals package.Id
                                         join payment in ctx.Payments on order.Payment equals payment.Id
                                         where order.CustomerId == int.Parse(User.Identity.Name)
                                         select new
                                         {
                                             orderId = order.Id,
                                             pickupAddress = order.PickupStreet + ' ' + order.PickupHouseNumber + ", " + order.PickupCity + ", " + order.PickupZipCode,
                                             shipmentAddress = order.ShipmentStreet + ' ' + order.ShipmentHouseNumber + ", " + order.ShipmentCity + ", " + order.ShipmentZipCode,
                                             pickupDate = order.PickupDate,
                                             status = order.Status,
                                             deliveryDate = order.DeliveryDate,
                                             services = order.Services,
                                             paymentMethod = payment.Name,
                                             weight = package.Weight,
                                             price = package.Price
                                         }).ToListAsync();

            return new JsonResult(shipments_query);
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //Courier API------------------------------------------------------------------------
        [HttpPut("AcceptOrder/{id}")]
        [Authorize(Policy="courier")]
        public async Task<IActionResult> AcceptOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);
            order.CourierId = int.Parse(User.Identity.Name);
            order.Status = "Accepted";
            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPut("PickedUpOrder/{id}")]
        [Authorize(Policy = "courier")]
        public async Task<IActionResult> PickedUpOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);
            order.Status = "In progress";
            order.DeliveryDate = order.PickupDate.AddDays(2);
            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpPut("DeliveredOrder/{id}")]
        [Authorize(Policy = "courier")]
        public async Task<IActionResult> DeliveredOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);
            order.Status = "Done";
            order.DeliveryDate = DateTime.Now;
            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpGet("MyShipments")]
        [Authorize(Policy = "courier")]
        public async Task<ActionResult> GetMyShipments()
        {
            using var ctx = _context;
            var shipments_query = await (from order in ctx.Orders
                                   join customer in ctx.Customers on order.CustomerId equals customer.Id
                                   join package in ctx.Packages on order.Package equals package.Id
                                   join payment in ctx.Payments on order.Payment equals payment.Id
                                   where order.CourierId == null || order.CourierId == int.Parse(User.Identity.Name)
                                   select new
                                   {
                                       orderId = order.Id,
                                       pickupAddress = order.PickupStreet + ' ' + order.PickupHouseNumber + ", " + order.PickupCity + ", " + order.PickupZipCode,
                                       shipmentAddress = order.ShipmentStreet + ' ' + order.ShipmentHouseNumber + ", " + order.ShipmentCity + ", " + order.ShipmentZipCode,
                                       pickupDate = order.PickupDate,
                                       name = customer.Name,
                                       phoneNumber = customer.PhoneNumber,
                                       status = order.Status,
                                       deliveryDate = order.DeliveryDate,
                                       services = order.Services,
                                       paymentMethod = payment.Name,
                                       weight = package.Weight,
                                       price = package.Price
                                   }).ToListAsync();

            return new JsonResult(shipments_query);
        }

        //Courier API------------------------------------------------------------------------

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/Orders/AllActiveOrders
        [HttpGet("AllActiveOrders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllActiveOrders()
        {
            var activeShipments = await _context.Orders.Where(o => o.Status == "active").ToListAsync();

            if (activeShipments == null)
            {
                return NotFound();
            }

            return activeShipments;
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
