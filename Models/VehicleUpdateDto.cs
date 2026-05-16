namespace ElvanCarApp.Models
{
    public class VehicleUpdateDto
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? Status { get; set; }
        public bool Announcement { get; set; }
        public int Year { get; set; }
        public int KM { get; set; }
        public string? FuelType { get; set; }
    }
}
