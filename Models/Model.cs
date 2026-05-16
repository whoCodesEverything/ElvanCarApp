using System.ComponentModel.DataAnnotations;

namespace ElvanCarApp.Models
{
    public class Model
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public bool IsDeleted { get; set; }


        public int BrandId { get; set; }

        public Brand Brand { get; set; } = null!;
    }
}
