namespace API.DTOs
{
    public class CheckoutDto
    {
        public int ShippingMethodId { get; set; }
        public int PaymentMethodId { get; set; }
        public int? PromotionId { get; set; }
        public string FullName { get; set; }
        public string Destination { get; set; }
        public string PhoneNumber { get; set; }
    }
}