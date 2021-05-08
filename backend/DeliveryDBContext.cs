using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Bushware
{
    public class DeliveryDBContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlServer(@"Server=tcp:delivery-server.database.windows.net,1433;" +
                "Initial Catalog=delivery_db;Persist Security Info=False;User ID=delivery_admin;" +
                "Password=Bushware123;MultipleActiveResultSets=False;Encrypt=True;" +
                "TrustServerCertificate=False;Connection Timeout=30;");
    }

    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Order> Orders { get; } = new List<Order>();
    }

    public class Order
    {
        public int Id { get; set; }
        public Customer Customer { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string Status { get; set; }
        public string EstDeliveryDate { get; set; }
    }
}
