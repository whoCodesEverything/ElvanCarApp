import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../vehicles';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VehicleListDto } from '../VehicleListDto';
@Component({
  selector: 'app-vehicle-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.scss']
})
export class VehicleAddComponent implements OnInit {

  title = 'Vehicle List';

  vehicles: Vehicle[] = [];

  vehicless: VehicleListDto[] = [];

  // selectedVehicle: Vehicle | null = null;
  selectedVehicle: VehicleListDto | null = null;

  brands: any[] = [];
  models: any[] = [];

  selectedBrandId: number = 0;
  selectedModelId: number = 0;
  isEditMode = false;

  page=1;
  pageSize=7;
  hasMore=true;
  constructor(private vehicleService: VehicleService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getVehicles();
    this.loadBrands();
  }

  loadBrands() {
    if (this.brands.length > 0) return;

    this.vehicleService.getBrands()
      .subscribe(res => {
        this.brands = res;
      });
  }

  onBrandChange() {
    this.selectedModelId = 0;
    this.models = [];

    if (!this.selectedBrandId || this.selectedBrandId === 0) {
      return;
    }

    this.vehicleService
      .getModelsByBrand(this.selectedBrandId)
      .subscribe(res => {
        this.models = res;
      });
  }

  onSelect(vehicless: VehicleListDto): void {
    this.selectedVehicle = vehicless;
    this.isEditMode = true;
  }

  isUpdated = false;

  update(): void {
    if (!this.selectedVehicle) return;

    this.vehicleService.update(this.selectedVehicle).subscribe({
      next: () => {

        const index = this.vehicless.findIndex(
          v => v.id === this.selectedVehicle!.id
        );

        if (index !== -1) {
          this.vehicless[index] = { ...this.selectedVehicle! };
          this.vehicles = [...this.vehicles];
        }

        this.isUpdated = true;
        setTimeout(() => {
          this.isEditMode = false;
          this.selectedVehicle = null;
          this.isUpdated = false;
        }, 1500);
      }
    });
  }

  add(
    //  brand: string,
    //  model: string,
    brandId: number,
    modelId: number,
    yil: string,
    km: string,
    yakitTuru: string,
    status: string,
    ilanda: boolean
  ): void { 
    const vehicle: VehicleListDto = {
      id: 0,
      brandId,
      modelId,
      yil,
      km,
      yakitTuru,
      status,
      ilanda,
      brandName: '',
      modelName: ''
    };
    //listeyi yeniden çek
    this.vehicleService.addVehicle(vehicle).subscribe(() => {
      this.getVehicles();
    });


    // this.vehicleService.add(vehicle);

    this.vehicleService.add(vehicle).subscribe({

      next: (created) => {

        //this.vehicles.push(created);


        this.selectedVehicle = created;
      },
      error: err => console.error(err)
    });

  }

  getVehicles(): void {
    //this.vehicleService.getVehicles().subscribe(vehicless => { this.vehicless = vehicless; });

    this.vehicleService.getVehicles(this.page,this.pageSize).subscribe({
      next: (data) => {
        this.vehicless = [...data];
        this.cd.detectChanges();
        
      },
      error: (err) => {
        console.error('Vehicle listesi alınamadı:', err);
      }
    });
  }

  loadMore():void{

  this.page++;
  this.vehicleService.getVehicles(this.page, this.pageSize).subscribe(
    data=>{this.vehicless=[...this.vehicless,...data];
      
    });
  
}

}
