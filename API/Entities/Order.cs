using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public int CustomerId { get; set; }
        public AppUser Customer { get; set; }
        public string FullName { get; set; }
        public string Destination { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public int? PromotionId { get; set; }
        public Promotion Promotion { get; set; }
        public int ShippingMethodId { get; set; }
        public ShippingMethod ShippingMethod { get; set; }
        public int PaymentMethodId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public double SubTotal { get; set; }
        public double Discount { get; set; }
        public int State { get; set; }
    }
}