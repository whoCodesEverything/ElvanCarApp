import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,VehicleListComponent,VehicleAddComponent,NavbarComponent,DashboardComponent,VehicleDetailComponent],
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss'] 
})
export class AppComponent {

  title = 'elvan-car';
}
