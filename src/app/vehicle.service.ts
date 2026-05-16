import { Injectable } from '@angular/core';
import { Vehicle } from './vehicles';
import { filter, Observable, of } from 'rxjs';
//import { Vehicles } from './vehicle.datasource';
import { HttpClient } from '@angular/common/http';
import { VehicleListDto } from './VehicleListDto';
import { VehicleResponse } from './VehicleResponse';
//import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiVehiclesUrl = "https://localhost:44378/api/Vehicles";
  private apiBrandsUrl = "https://localhost:44378/api/Brands";
  private apibyBrand = "https://localhost:44378/api/Models";
  private apiVehiclesFilter="https://localhost:44378/api/Vehicles/filter"


  constructor(private http: HttpClient) { }
  // getVehicles(): Vehicle[] {

  //   //Bunların apiden gelmesi
  //   this.vehicles = [
  //     { id: 1, name: 'BMW',description:'test-1',imageUrl:'1.jpg'},
  //     { id: 2, name: 'Audi',description:'test-2',imageUrl:'2.jpg' },
  //     { id: 3, name: 'Toyota',description:'test-3',imageUrl:'3.jpg' }
  //   ];

  //   return this.vehicles;
  // }


  //  update(vehicle: Vehicle): void {
  //     const index = this.vehicles.findIndex(v => v.id === vehicle.id);
  //     if (index !== -1) {
  //       this.vehicles[index] = { ...vehicle };
  //     }
  //   }


  //apiden güncelleme
  update(vehicle: VehicleListDto): Observable<void> {
    return this.http.put<void>(
      `${this.apiVehiclesUrl}/${vehicle.id}`,
      vehicle
    );
  }



  // addVehicle(vehicle: Vehicle): Vehicle {

  //   // otomatik id üret
  //   const newId =
  //     this.vehicles.length > 0
  //       ? Math.max(...this.vehicles.map(v => v.id)) + 1
  //       : 1;

  //   const newVehicle: Vehicle = {
  //     id: newId,
  //     name: vehicle.name,
  //     description: vehicle.description,
  //     imageUrl: vehicle.imageUrl
  //   };

  //   this.vehicles.push(newVehicle);
  // //this.vehicleService.addVehicle(this.vehicles);
  //   return newVehicle;
  // }


  // getVehicle(id: number): Vehicle {
  //   return this.vehicles.find(v => v.id === id)!;
  // }

  // private apiVehiclesUrl = 'api/vehicles';

  // constructor(
  //   private loggingService: LoggingService,
  //   private http: HttpClient
  // ) { }


  getVehicles(page: number, pageSize: number): Observable<VehicleListDto[]> {

    return this.http.get<VehicleListDto[]>(this.apiVehiclesUrl, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    });
  }

  getVehiclesFilter(page:number,pageSize:number,filters:any):Observable<VehicleResponse>
  {
    return this.http.get<VehicleResponse>(this.apiVehiclesFilter,{
      params:{
        page:page.toString(),
        pageSize:pageSize.toString(),
        search:filters.search || '',
        year:filters.year ? filters.year.toString():'',
        status:filters.status || '',
        brand:filters.brand || '',
        model:filters.model || '',
        minKm:filters.minKm ? filters.minKm.toString():'',
        maxKm:filters.maxKm ? filters.maxKm.toString():''
        //km:filters.km || ''
      }
    });
  }
  

  add(vehicle: VehicleListDto): Observable<VehicleListDto> {
    return this.http.post<VehicleListDto>(this.apiVehiclesUrl, vehicle);
  }

  getById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(
      `${this.apiVehiclesUrl}/${id}`
    );
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiVehiclesUrl}/${id}`);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiVehiclesUrl}/${id}`);
  }

  //Id+name göre 
  getBrands() {
    return this.http.get<any[]>(`${this.apiBrandsUrl}/list`);
  }

  getAllBrands() {
    return this.http.get<any[]>(
      `${this.apiVehiclesUrl}/BrandsAPI/all`
    )
  }
  //marka id'ye göre model doldurma dropdown doldurma
  getModelsByBrand(brandId: number) {
    return this.http.get<any[]>(`${this.apibyBrand}/byBrand/${brandId}`);
  }


  addVehicle(data: any) {
    return this.http.post(this.apiBrandsUrl, data);
  }
}
