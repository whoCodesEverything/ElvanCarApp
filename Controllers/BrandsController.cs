using ElvanCarApp.Data;
using ElvanCarApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElvanCarApp.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class BrandsController : ControllerBase
    {

        private readonly MyDBContext context;

        public BrandsController(MyDBContext _context)
        {
            context = _context;
        }

        [HttpPost]
        public async Task<ActionResult> AddBrand([FromBody] BrandCreateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Brand adı boş olamaz");

            var exists = await context.Brands.AnyAsync(b => b.Name == dto.Name);
            if (exists)
                return BadRequest("Bu brand zaten mevcut");

            var brand = new Brand
            {
                Name = dto.Name,
                IsDeleted = false
            };

            context.Brands.Add(brand);
            await context.SaveChangesAsync();

            return Ok(new
            {
                brand.Id,
                brand.Name
            });
        }



        [HttpGet("all")]
        public async Task<ActionResult<Brand>> GetAll()
        {
            return Ok(await context.Brands.ToListAsync());
        }

        [HttpGet("list")]
        public async Task<ActionResult<Brand>> GetBrands()
        {
            var brands = await context.Brands.Select(x => new
            {
                x.Id,
                x.Name
            }).ToListAsync();

            return Ok(brands);
        }

    }
}
