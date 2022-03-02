import { NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PassengerDashboardComponent} from "./containers/passenger-dashboard/passenger-dashboard.component";
import {PassengerCountComponent} from "./components/passenger-count/passenger-count.component";
import {PassengerDetailComponent} from "./components/passenger-detail/passenger-detail.component";
import {PassengerDashboardService} from "./passenger-dashboard.service";
import {HttpClientModule} from "@angular/common/http";
import {PassengerViewerComponent} from "./containers/passenger-viewer/passenger-viewer.component";
import {PassengerFormComponent} from "./components/passenger-form/passenger-form.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PassengerDashboardComponent,
    PassengerCountComponent,
    PassengerDetailComponent,
    PassengerViewerComponent,
    PassengerFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    PassengerDashboardComponent,
    PassengerViewerComponent
  ],
  providers: [
    PassengerDashboardService
  ]
})
export class PassengerDashboardModule{}
