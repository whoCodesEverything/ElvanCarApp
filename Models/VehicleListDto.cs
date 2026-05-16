namespace ElvanCarApp.Models
{
    public class VehicleListDto
    {

        public int Id { get; set; }

        public int? ModelId { get; set; }
        public string? ModelName { get; set; } = null!;

        public int? BrandId { get; set; }
        public string? BrandName { get; set; } = null!;

        public string? Status { get; set; }
        public bool? Announcement { get; set; }
        public int? Year { get; set; }
        public int? KM { get; set; }
        public string? FuelType { get; set; }
        public string? ImageUrl { get; set; }
    }
}
