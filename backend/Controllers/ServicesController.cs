using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bushware.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Bushware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly DeliveryDBContext _context;

        public ServicesController(DeliveryDBContext context)
        {
            _context = context;
        }

        // GET: api/Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Services>>> GetServices()
        {
            MethodLogger.GetInstance().ToLog(2, this.GetType().Name, MethodLogger.GetCurrentMethod(), User.Identity.Name, User.Identity.AuthenticationType);
            return await _context.Services.ToListAsync();
        }
    }
}
