using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderDetailDto
    {
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string PhotoUrl { get; set; }
        public string ColorCode { get; set; }
        public string ColorName { get; set; }
        public string Price { get; set; }
        public int Quantity { get; set; }
    }
}