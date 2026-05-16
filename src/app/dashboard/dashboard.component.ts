import { Component, model, OnInit } from '@angular/core';
import { Vehicle } from '../vehicles';
import { VehicleService } from '../vehicle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { VehicleListDto } from '../VehicleListDto';
import { VehicleResponse } from '../VehicleResponse';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  vehicless: VehicleListDto[] = [];
  vehiclesFilt: VehicleResponse[] = [];
  vehicleLength = 0;
  totalCount = 0;
  page = 1;
  pageSize = 7;
  hasMore = true;
  isFiltering = false;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles();
  }
  //  getVehicles(): void {
  //     this.vehicles = this.vehicleService.getVehicles();
  //   }


  // getVehicles(): void {
  //   this.vehicleService.getVehicles(this.page, this.pageSize)
  //     .subscribe(data => {
  //       this.vehicless = data;

  //     });
  // }

  getVehicles(): void {

    this.vehicleService.getVehicles(this.page, this.pageSize).subscribe({
      next: data => {
        this.vehicless = data;
        if (data.length < this.pageSize) {
          this.hasMore = false;
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }



  // loadMore(): void {

  //   this.page++;
  //   this.vehicleService.getVehicles(this.page, this.pageSize).subscribe(
  //     data => {
  //       this.vehicless = [...this.vehicless, ...data];

  //     });
  // }
  loadMore(): void {

    this.page++;

    if (this.isFiltering) {

      this.vehicleService
        .getVehiclesFilter(this.page, this.pageSize, this.filters)
        .subscribe(response => {

          this.vehicless = [...this.vehicless, ...response.vehicles];

          this.hasMore = this.vehicless.length < response.totalCount;

        });

    }
    else {

      this.vehicleService
        .getVehicles(this.page, this.pageSize)
        .subscribe(data => {

          this.vehicless = [...this.vehicless, ...data];

          if (data.length < this.pageSize) {
            this.hasMore = false;
          }

        });

    }

  }


  filters = {
    search: '',
    year: null,
    status: '',
    brand: '',
    model: '',
    //km:null,
    minKm: null,
    maxKm: null

  }

  // loadFilteredVehicles(){
  //   this.page=1;
  //   this.vehicleService.getVehiclesFilter(this.page,this.pageSize, this.filters)
  //   .subscribe(response=>{
  //     this.totalCount=response.totalCount;
  //     this.vehicless=response.vehicles;
  //     this.hasMore =response.vehicles.length<response.totalCount;
  //   });
  // }

  loadFilteredVehicles() {

    if (!this.filters.brand && !this.filters.model && !this.filters.minKm && !this.filters.maxKm) {
      this.getVehicles();
      return;
    }
    this.isFiltering = true;
    this.page = 1;

    this.vehicleService.getVehiclesFilter(this.page, this.pageSize, this.filters).subscribe(response => {
      this.totalCount = response.totalCount;
      this.vehicless = response.vehicles;
      this.hasMore = this.vehicless.length < this.totalCount;
    });
  }
}





