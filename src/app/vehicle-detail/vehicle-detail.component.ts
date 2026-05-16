import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../vehicles';
import { VehicleService } from '../vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VehicleListDto } from '../VehicleListDto';

@Component({
  selector: 'vehicle-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit {

  //@Input() vehicle: Vehicle | undefined
  vehicle!: Vehicle;

  vehicles: Vehicle[] = [];
  vehicless: VehicleListDto[] = [];

  selectedVehicle: VehicleListDto | null = null;
  page=1;
  pageSize=7;
  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

 const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (id) {
      this.vehicleService.getVehicleById(id).subscribe({
        next: data => {
          console.log('DETAY DATA:', data);
          this.vehicle = data;
        },
        error: err => console.error(err)
      });
    }
  }


  getVehicleById(id: number): void {
  this.vehicleService.getById(id).subscribe({
    next: (data) => {
      this.vehicle = data;
    },
    error: (err) => {
      console.error('Araç bulunamadı', err);
    }
  });
}

  //apiden veri çağırma

  getVehicles(): void {
    this.vehicleService.getVehicles(this.page,this.pageSize).subscribe(data => { this.vehicless = data; });
  }


  save(): void {
    if (!this.vehicle) {
      return;
    }

    if (!this.selectedVehicle) return;

    //this.vehicleService.update(this.vehicle);

     this.vehicleService.update(this.selectedVehicle).subscribe({
      next: () => alert('Güncelleme başarılı'),
      error: err => console.error(err)
    });


  }

  loadMore():void{

  this.page++;
  this.vehicleService.getVehicles(this.page, this.pageSize).subscribe(
    data=>{this.vehicless=[...this.vehicless,...data];

    });
  
}

}
