namespace API.Helpers
{
    public class SearchProductParams : PaginationParams
    {
        public string Keyword { get; set; }
        public string Categories { get; set; }
        public double MinPrice { get; set; } = 0;
        public double MaxPrice { get; set; } = 1000000000;
        public string OrderBy { get; set; } = "newest";
        
    }
}