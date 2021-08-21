namespace API.Extensions
{
    public static class ProductColorStateExtensions
    {
        public static string GetProductColorState(this int quantity)
        {
            var state = "";
            switch (quantity)
            {
                case <= 0:
                    state = "Hết hàng";
                    break;

                case > 0:
                    state = "Còn hàng";
                    break;
            }
            return state;
        }
    }
}