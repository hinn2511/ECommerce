using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Collection> Collections { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }

         protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(l => l.Products);

            builder.Entity<Product>()
                .HasOne(p => p.Brand)
                .WithMany(l => l.Products);

            builder.Entity<Product>()
                .HasOne(p => p.Collection)
                .WithMany(l => l.Products);

            builder.Entity<ProductColor>()
                .HasKey(k => new { k.ProductId, k.ColorId });

            builder.Entity<ProductColor>()
                .HasOne(pc => pc.Product)
                .WithMany(p => p.ProductColors)
                .HasForeignKey(pc => pc.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ProductColor>()
                .HasOne(pc => pc.Color)
                .WithMany(p => p.ProductColors)
                .HasForeignKey(pc => pc.ColorId)
                .OnDelete(DeleteBehavior.Cascade);

        }

    }
}