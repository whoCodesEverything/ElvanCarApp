using ElvanCarApp.Data;
using ElvanCarApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ElvanCarApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {

        private readonly MyDBContext context;

        public VehiclesController(MyDBContext context)
        {
            this.context = context;
        }


        [HttpGet]
        public async Task<IActionResult> GetVehicles(int page = 1, int pageSize = 10)
        {
       

            var query = context.Vehicles.Include(v => v.Model).ThenInclude(m => m.Brand).Where(v => v.IsDeleted==false);

            var totalCount = await query.CountAsync();

            var vehicles = await query
                .OrderByDescending(v => v.Id) // sıralama önemli
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(v => new VehicleListDto
                {
                    Id = v.Id,

                    ModelId = v.ModelId,
                    ModelName = v.Model.Name,

                    BrandId = v.Model.BrandId,
                   // BrandName = v.Model.Brand.Name,
                    BrandName = v.Model.Brand.Name != null ? v.Model.Brand.Name : "",
                    Status = v.Status,
                    Announcement = v.Announcement,
                    Year = v.Year,
                    KM = v.KM,
                    FuelType = v.FuelType,
                    ImageUrl = $"{Request.Scheme}://{Request.Host}/uploads/{v.ImageUrl}"
                   
                })
                .ToListAsync();

             return Ok(vehicles);

        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetVehiclesFilter(
                 int page = 1,
                 int pageSize = 10,
                 string? search = null,
                 int? year = null,
                 string? status = null,
                 string? brand = null,
                 string? model = null,
                 int? minKm = null,
                 int? maxKm = null
                 //int? km=null
                 )

        {
             var query = context.Vehicles.Where(v => v.IsDeleted == false);
        

            //Arama
            if (!string.IsNullOrEmpty(search))
                query = query.Where(v => v.Model.Brand.Name.Contains(search) || v.Model.Name.Contains(search));

            //brand filtre
            if (!string.IsNullOrEmpty(brand))
                query = query.Where(v => v.Model.Brand.Name.Contains(brand));

            //model filtre

            if (!string.IsNullOrEmpty(model))
                query = query.Where(v => v.Model.Name.Contains(model));
            //km filtresi

            if (minKm.HasValue)
                query = query.Where(v => v.KM >= minKm.Value);

            if (maxKm.HasValue)
                query = query.Where(v => v.KM <= maxKm.Value);

            //Yıl filtresi
            if (year.HasValue)
                query = query.Where(v => v.Year == year.Value);

            //durum filtersi
            if (!string.IsNullOrEmpty(status))
                query = query.Where(v => v.Status == status);

            var totalCount = await query.CountAsync();


            var vehicles = await query.OrderByDescending(v => v.Id).Skip((page - 1) * pageSize).Take(pageSize).Select(v => new
            {

                id=v.Id,
                brandName=v.Model.Brand.Name,
                modelName=v.Model.Name,
                yil=v.Year,
                km=v.KM,
                yakitTuru=v.FuelType,
                status=v.Status,
                imageUrl=v.ImageUrl

            } ).ToListAsync();

            return Ok(new { totalCount, vehicles });
        }

        [HttpGet("id")]
        public async Task<ActionResult<Vehicle>> GetVehicleById(int id)
        {
            var vehicle = await context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }
            return vehicle;
        }

        //sadece tek araç için detay bilgisi aracı getirir
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {


            var vehicle = await context.Vehicles.Where(v => v.Id == id).Select(v => new
            {
                id = v.Id,
                brand=v.Model.Brand.Name,
                model = v.Model.Name,
                yil = v.Year,
                km = v.KM,
                yakitTuru = v.FuelType,              
                status = v.Status,
                ilanda=v.Announcement
            }).FirstOrDefaultAsync();
            if (vehicle == null)
                return NotFound();
            return Ok(vehicle);
        }


        [HttpPost]
        public async Task<ActionResult<Vehicle>> CreateVehicle([FromBody] VehicleAddDto vdto)
        {
            if (vdto == null)
                return BadRequest("Vehicle bilgisi gönderilmedi!");

            var vhc = new Vehicle
            {
                ModelId = vdto.ModelId,
                Year = vdto.Year,
                KM = vdto.Km,
                FuelType = vdto.FuelType,
                Status = vdto.Status,
                Announcement = vdto.Announcement

            };

            context.Vehicles.Add(vhc);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVehicleById), new { id = vhc.Id }, vhc);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id,VehicleUpdateDto dto)
        {

            if (id != dto.Id)
            {
                return BadRequest("Id uyusmuyor");
            }


            var vehicle = await context.Vehicles.FindAsync(id);

            if (vehicle == null)
            {
                return NotFound("Kayıt bulunmadı...");
            }

            vehicle.ModelId = dto.ModelId;
            vehicle.Status = dto.Status;
            vehicle.Announcement = dto.Announcement;
            vehicle.Year = dto.Year;
            vehicle.KM = dto.KM;
            vehicle.FuelType = dto.FuelType;
       
            await context.SaveChangesAsync();

            return Ok(vehicle);

        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await context.Vehicles
                                      .FirstOrDefaultAsync(x => x.Id == id);

            if (vehicle == null)
                return NotFound();

            vehicle.IsDeleted = true;
            await context.SaveChangesAsync();

            return Ok(new { message = "Araç silindi" });
        }

    }
}
