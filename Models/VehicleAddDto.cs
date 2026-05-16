namespace ElvanCarApp.Models
{
    public class VehicleAddDto
    {

        public int BrandId { get; set; }
        public int ModelId { get; set; }
        public int Year { get; set; }
        public int Km { get; set; }
        public string? FuelType { get; set; }
        public string? Status { get; set; }
        public bool Announcement { get; set; }
    }
}
