
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../vehicles';
import { VehicleService } from '../vehicle.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VehicleListDto } from '../VehicleListDto';
import { VehicleResponse } from '../VehicleResponse';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {

  title: string = 'Araç Listesi';
  vehicles: Vehicle[] = [];
  vehicless: VehicleListDto[] = [];


  brands: any[] = [];
  models: any[] = [];

  selectedBrandId: number = 0;
  selectedModelId: number = 0;
  page=1;
  pageSize=10;
  hasMore=true;
  totalCount=true;

  constructor(private vehicleService: VehicleService) { }
  //vehicles$!: Observable<Vehicle[]>;

  vehicless$!: Observable<VehicleListDto[]>;
  ngOnInit(): void {
    this.getVehicles();

    this.loadBrands();

  }

  loadBrands() {
    debugger;
    if (this.brands.length > 0)
      return;

    this.vehicleService.getBrands()
      .subscribe({
        next: (res) => {
          this.brands = res;
        },
        error: (err) => {
          console.error('Brand load error:', err);
        }
      });
  }

  onBrandChange() {
    this.models = [];
    this.selectedModelId = 0;

    if (!this.selectedBrandId || this.selectedBrandId == 0) {
      return;
    }


    this.vehicleService.getModelsByBrand(this.selectedBrandId)
      .subscribe(res => {
        this.models = res;
        // this.selectedModelId = 0;
      })
  }



  getVehicles(): void {

    this.vehicleService.getVehicles(this.page,this.pageSize).subscribe({
      next: data => {
        this.vehicless = data;
        if(data.length<this.pageSize){
          this.hasMore=false;
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }


  delete(id: number, event: Event): void {
    event.stopPropagation();

    if (!confirm('Bu aracı silmek istediğine emin misin')) return;

    this.vehicleService.deleteService(id).subscribe({
      next: () => {
        alert('Araç başarı ile silindi');
        //this.loadVehicles();

        this.page=1;
        this.hasMore=true;
        this.getVehicles();
      },
      error: err => console.error(err)
    });
  }


  // loadVehicles(): void {
  //   this.vehicleService.getVehicles().subscribe({
  //     next: data => {
  //       this.vehicless = data;
  //     },
  //     error: err => console.error(err)
  //   });
  // }

loadMore():void{

  this.page++;
  this.vehicleService.getVehicles(this.page, this.pageSize).subscribe(
    data=>{this.vehicless=[...this.vehicless,...data];

    });
}
  addVehicle() {

    if(!this.selectedBrandId || !this.selectedModelId){
      alert('Lufen marka ve model seçiniz');
      return;
    }

    const data = {
      brandId: this.selectedBrandId,
      modelId: this.selectedModelId
    };

    this.vehicleService.addVehicle(data).subscribe({
      next:()=>{
        alert("araç eklendi");
        this.page=1;
        this.hasMore=true;
        this.getVehicles();
      },
      error:err=>console.log(err)
    });
  }

}
