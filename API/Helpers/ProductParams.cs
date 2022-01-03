namespace API.Helpers
{
    public class ProductParams : PaginationParams
    {
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string Area { get; set; }
        public bool Sale { get; set; }
        public int SaleUpTo { get; set; }
        public double MinPrice { get; set; } = 0;
        public double MaxPrice { get; set; } = 1000000000;
        public string OrderBy { get; set; } = "newest";
        public string Keyword { get; set; }
    }
}