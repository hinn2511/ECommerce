using System.Collections.Generic;

namespace API.Entities
{
    public class PaymentMethod
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool State { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}