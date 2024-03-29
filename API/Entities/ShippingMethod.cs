using System.Collections;
using System.Collections.Generic;

namespace API.Entities
{
    public class ShippingMethod
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MinTime { get; set; }
        public int MaxTime { get; set; }
        public double Price { get; set; }
        public bool State { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}