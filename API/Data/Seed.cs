using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            
            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Customer"},
                new AppRole{Name = "Logistic"},
                new AppRole{Name = "Sales"},
                new AppRole{Name = "Purchasing"},
                new AppRole{Name = "Manager"},
                new AppRole{Name = "Admin"}
            };

            foreach(var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach( var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Customer");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] {"Admin"});

            var manager = new AppUser
            {
                UserName = "manager"
            };

            await userManager.CreateAsync(manager, "Pa$$w0rd");
            await userManager.AddToRolesAsync(manager, new[] {"Manager"});

            var purchasing = new AppUser
            {
                UserName = "purchasing"
            };

            await userManager.CreateAsync(purchasing, "Pa$$w0rd");
            await userManager.AddToRolesAsync(purchasing, new[] {"Purchasing"});

            var sales = new AppUser
            {
                UserName = "sales"
            };

            await userManager.CreateAsync(sales, "Pa$$w0rd");
            await userManager.AddToRolesAsync(sales, new[] {"Sales"});

            var logistic = new AppUser
            {
                UserName = "logistic"
            };

            await userManager.CreateAsync(logistic, "Pa$$w0rd");
            await userManager.AddToRolesAsync(logistic, new[] {"Logistic"});
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
                await context.ProductColors.AddAsync(productColor);
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

                await context.Categories.AddAsync(category);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedSubCategories(DataContext context)
        {
            if (await context.SubCategories.AnyAsync()) return;

            var subCategoryData = await System.IO.File.ReadAllTextAsync("Data/SubCategorySeedData.json");

            var subCategories = JsonSerializer.Deserialize<List<SubCategory>>(subCategoryData);

            foreach ( var subCategory in subCategories)
            {
                subCategory.SubCategoryName = subCategory.SubCategoryName.ToLower();

                await context.SubCategories.AddAsync(subCategory);
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
                await context.Colors.AddAsync(color);
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

                await context.Brands.AddAsync(brand);
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

                await context.Collections.AddAsync(collection);
            }

            await context.SaveChangesAsync();
        }
    }
}