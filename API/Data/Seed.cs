using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach ( var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedProducts(DataContext context)
        {
            if (await context.Products.AnyAsync()) return;

            var productData = await System.IO.File.ReadAllTextAsync("Data/ProductSeedData.json");

            var products = JsonSerializer.Deserialize<List<Product>>(productData);

            foreach ( var product in products)
            {
                product.ProductName = product.ProductName.ToLower();

                context.Products.Add(product);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedProductColors(DataContext context)
        {
            if (await context.ProductColors.AnyAsync()) return;

            var productColorData = await System.IO.File.ReadAllTextAsync("Data/ProductColorSeedData.json");

            var productColors = JsonSerializer.Deserialize<List<ProductColor>>(productColorData);

            foreach ( var productColor in productColors)
            {
                context.ProductColors.Add(productColor);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedCategories(DataContext context)
        {
            if (await context.Categories.AnyAsync()) return;

            var categoryData = await System.IO.File.ReadAllTextAsync("Data/CategorySeedData.json");

            var categories = JsonSerializer.Deserialize<List<Category>>(categoryData);

            foreach ( var category in categories)
            {
                category.CategoryName = category.CategoryName.ToLower();

                context.Categories.Add(category);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedColors(DataContext context)
        {
            if (await context.Colors.AnyAsync()) return;

            var colorData = await System.IO.File.ReadAllTextAsync("Data/ColorSeedData.json");

            var colors = JsonSerializer.Deserialize<List<Color>>(colorData);

            foreach ( var color in colors)
            {
                color.ColorName = color.ColorName.ToLower();
                color.HexCode = color.HexCode.ToLower();
                context.Colors.Add(color);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedBrands(DataContext context)
        {
            if (await context.Brands.AnyAsync()) return;

            var brandData = await System.IO.File.ReadAllTextAsync("Data/BrandSeedData.json");

            var brands = JsonSerializer.Deserialize<List<Brand>>(brandData);

            foreach ( var brand in brands)
            {
                brand.BrandName = brand.BrandName.ToLower();

                context.Brands.Add(brand);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedCollections(DataContext context)
        {
            if (await context.Collections.AnyAsync()) return;

            var collectionData = await System.IO.File.ReadAllTextAsync("Data/CollectionSeedData.json");

            var collections = JsonSerializer.Deserialize<List<Collection>>(collectionData);

            foreach ( var collection in collections)
            {
                collection.CollectionName = collection.CollectionName.ToLower();

                context.Collections.Add(collection);
            }

            await context.SaveChangesAsync();
        }
    }
}