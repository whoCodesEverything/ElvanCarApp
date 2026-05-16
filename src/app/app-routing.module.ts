import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes : Routes=[
  { path:'',redirectTo:'/dashboard',pathMatch:'full'},
  { path:'dashboard',component:DashboardComponent},
  { path:'vehicles', component:VehicleAddComponent },
  //{ path:'detail/:id', component:VehicleDetailComponent }

];



@NgModule({
  declarations: [],
  
  imports: [
    RouterModule.forRoot(routes,{
      onSameUrlNavigation:'reload'
    })
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
