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
    }
}