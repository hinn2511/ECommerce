using System;

namespace API.DTOs
{
    public class PromotionDto
    {
        public int Id { get; set; }
        public string PromotionCode { get; set; }
        public int DiscountPercent { get; set; }
        public double MaxDiscountAmount { get; set; }
        public double MinOrderTotal { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}