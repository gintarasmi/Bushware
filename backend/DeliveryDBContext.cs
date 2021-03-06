using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Bushware
{
    public class DeliveryDBContext : DbContext
    {
        public DeliveryDBContext(DbContextOptions<DeliveryDBContext> options)
            : base(options)
        { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Courier> Couriers { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Services> Services { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlServer(@"Server=tcp:delivery-server.database.windows.net,1433;" +
                "Initial Catalog=delivery_db;Persist Security Info=False;User ID=delivery_admin;" +
                "Password=Bushware123;MultipleActiveResultSets=False;Encrypt=True;" +
                "TrustServerCertificate=True;Connection Timeout=30;");
    }

    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        [Timestamp]
        public byte[] VersionId { get; set; }
    }
    public class Courier
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        [Timestamp]
        public byte[] VersionId { get; set; }
    }
    public class Address
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        [Timestamp]
        public byte[] VersionId { get; set; }
    }
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int? CourierId { get; set; }
        public string PickupCity { get; set; }
        public string PickupZipCode { get; set; }
        public string PickupStreet { get; set; }
        public string PickupHouseNumber { get; set; }
        public string ShipmentCity { get; set; }
        public string ShipmentZipCode { get; set; }
        public string ShipmentStreet { get; set; }
        public string ShipmentHouseNumber { get; set; }
        public string Status { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int Package { get; set; }
        public int Payment { get; set; }
        public string Services { get; set; }
        [Timestamp]
        public byte[] VersionId { get; set; }
    }
    public class Package
    {
        public int Id { get; set; }
        public float Weight { get; set; }
        public float Price { get; set; }
    }
    public class Payment
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class Services
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
    }

    public class CustOrder
    {
        public string pickupCity { get; set; }
        public string pickupStreet { get; set; }
        public string pickupHouseNumber { get; set; }
        public string pickupZipCode { get; set; }
        public DateTime pickupDate { get; set; }
        public string shipmentCity { get; set; }

        public string shipmentZipCode { get; set; }
        public string shipmentStreet { get; set; }
        public string shipmentHouseNumber { get; set; }
        public List<string> services { get; set; }
        public float weight { get; set; }
        public int payment { get; set; }
        public float price { get; set; }
    }
}
