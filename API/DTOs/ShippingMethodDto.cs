namespace API.DTOs
{
    public class ShippingMethodDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MinTime { get; set; }
        public int MaxTime { get; set; }
        public double Price { get; set; }
        public bool State { get; set; }
    }
}