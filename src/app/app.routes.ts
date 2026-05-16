// import { Routes } from '@angular/router';
// import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';

// export const routes: Routes = [

//     {
//     path: 'vehicles/:id',
//     component: VehicleDetailComponent,
//   }
// ];


import { Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';

export const routes: Routes = [
 { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'vehicles', component: VehicleListComponent },

  { path: 'vehicles/add', component: VehicleAddComponent },

  { path: 'vehicles/:id', component: VehicleDetailComponent },
  
];
