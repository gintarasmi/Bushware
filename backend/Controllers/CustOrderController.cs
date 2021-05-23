using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Bushware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustOrderController : ControllerBase {

        private readonly DeliveryDBContext _context;

        public CustOrderController(DeliveryDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize(Policy = "user")]
        public IActionResult PostCustOrder(CustOrder custOrder)
        {
            Order order = new();
            Package package = new();
            order.PickupCity = custOrder.pickupCity;
            order.PickupStreet = custOrder.pickupStreet;
            order.PickupHouseNumber = custOrder.pickupHouseNumber;
            order.PickupDate = custOrder.pickupDate;
            order.ShipmentCity = custOrder.shipmentCity;
            order.ShipmentHouseNumber = custOrder.shipmentHouseNumber;
            order.Services = string.Join(",", custOrder.services);
            order.Payment = custOrder.payment;
            order.Status = "Pending";
            order.CustomerId = int.Parse(User.Identity.Name);
            package.Weight = custOrder.weight;
            package.Price = custOrder.price;

            _context.Packages.Add(package);
            _context.SaveChanges();

            order.Package = package.Id;

            _context.Orders.Add(order);
            _context.SaveChanges();

            return Ok();
        }
    }
}

