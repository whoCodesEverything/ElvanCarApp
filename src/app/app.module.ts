import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

import { NgModule } from "@angular/core";
import { VehicleListComponent } from "./vehicle-list/vehicle-list.component";
import { VehicleAddComponent } from "./vehicle-add/vehicle-add.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
//import { InMemoryDataService } from "./in-memory-data.service";
import { NavbarComponent } from "./navbar/navbar.component";
import { VehicleDetailComponent } from "./vehicle-detail/vehicle-detail.component";

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


@NgModule({
    declarations:[
        AppComponent,
        VehicleListComponent,
        VehicleAddComponent,
        DashboardComponent,
        NavbarComponent,
        VehicleDetailComponent,
    
    
    ],

    imports:[
        BrowserModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        // HttpClientInMemoryWebApiModule.forRoot(
        //     InMemoryDataService, { dataEncapsulation : false }
        // )

    ],

//      providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: FakeBackendInterceptor,
//       multi: true
//     }
//   ],

   // providers:[],
    bootstrap:[AppComponent]

})

export class AppModule {}