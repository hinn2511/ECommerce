using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string FullName { get; set; }
        public string Destination { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<OrderDetailDto> OrderDetails { get; set; }
        public PromotionDto Promotion { get; set; }
        public ShippingMethodDto ShippingMethod { get; set; }
        public PaymentMethodDto PaymentMethod { get; set; }
        public double SubTotal { get; set; }
        public double Discount { get; set; }
        public string State { get; set; }
    }
}