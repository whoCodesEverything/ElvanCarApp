using ElvanCarApp.Data;
using ElvanCarApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElvanCarApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelsController : ControllerBase
    {
        private readonly MyDBContext context;

        public ModelsController(MyDBContext _context)
        {
            context = _context;
        }

        // POST: api/models
        [HttpPost]
        public async Task<ActionResult<Model>> Create([FromBody] ModelCreateDto dto)
        {
            var brandExists = await context.Brands.AnyAsync(x => x.Id == dto.BrandId);

            if (!brandExists)
                return BadRequest("Gecersiz BrandId");
            var mdl = new Model
            {
                Name = dto.Name,
                BrandId = dto.BrandId,
                IsDeleted = false
            };
            context.Models.Add(mdl);
            await context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetById), new { id = mdl.Id }, mdl);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ModelDetailDto>> GetById(int id)
        {

            var model = await context.Models.Where(x => x.Id == id && !x.IsDeleted).Select(x => new ModelDetailDto
            {
                Id = x.Id,
                Name = x.Name,
                BrandId = x.BrandId,
                BrandName = x.Brand != null ? x.Brand.Name : null
            }).FirstOrDefaultAsync();

            if (model == null)
                return NotFound();

            return Ok(model);
        }



        //markaya göre model listeleme
        [HttpGet("byBrand/{brandId}")]
        public async Task<ActionResult> GetModelsByBrand(int brandId)
        {
            var models = await context.Models.Where(x => x.BrandId == brandId && !x.IsDeleted)
                .Select(x => new
                {
                    x.Id,
                    x.Name
                }).ToListAsync();

            return Ok(models);

        }

    }

}

