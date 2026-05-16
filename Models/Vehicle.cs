namespace ElvanCarApp.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public Model Model { get; set; } = null!;

        public string? Status { get; set; }
        public bool? Announcement { get; set; }

        public int? Year { get; set; }
        public int? KM { get; set; }
        public string? FuelType { get; set; }

        public bool IsDeleted { get; set; }

        public string? ImageUrl { get; set; }
    }
}
