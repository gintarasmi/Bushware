using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Bushware.Utilities;

namespace Bushware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ActionFilterLogger]
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
            order.PickupZipCode = custOrder.pickupZipCode;
            order.PickupDate = custOrder.pickupDate;
            order.ShipmentCity = custOrder.shipmentCity;
            order.ShipmentStreet = custOrder.shipmentStreet;
            order.ShipmentHouseNumber = custOrder.shipmentHouseNumber;
            order.ShipmentZipCode = custOrder.shipmentZipCode;
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

