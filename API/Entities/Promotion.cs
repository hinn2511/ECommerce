using System;

namespace API.Entities
{
    public class Promotion
    {
        public int Id { get; set; }
        public string PromotionCode { get; set; }
        public int DiscountPercent { get; set; }
        public double DiscountAmount { get; set; }
        public double MaxDiscountAmount { get; set; }
        public double MinOrderTotal { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}