using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int CustomerId { get; set; }
        public AppUser Customer { get; set; }
        public string Destination { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public int PromotionId { get; set; }
        public Promotion Promotion { get; set; }
        public int ShippingMethodId { get; set; }
        public ShippingMethod ShippingMethod { get; set; }
        public double Total { get; set; }
        public bool Approved { get; set; }
    }
}