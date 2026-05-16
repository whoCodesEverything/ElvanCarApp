using ElvanCarApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ElvanCarApp.Data
{
    public class MyDBContext : DbContext
    {
        public MyDBContext()
        {

        }

        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Model>().ToTable("Model"); // Veritabanındaki gerçek tablo adı
            modelBuilder.Entity<Brand>().ToTable("Brand"); // gerekirse
        }
        //public virtual DbSet<Vehicle> Vehicles { get; set; } = null!;

        //public virtual DbSet<Brand> Brands { get; set; } = null!;

        //public virtual DbSet<Model> Models { get; set; } = null!;


        public DbSet<Vehicle> Vehicles { get; set; } = null!;
        public DbSet<Model> Models { get; set; } = null!;
        public DbSet<Brand> Brands { get; set; } = null!;


    }
}
