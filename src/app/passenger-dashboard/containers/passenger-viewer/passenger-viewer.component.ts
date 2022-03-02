import {Component, OnInit} from "@angular/core";
import {PassengerDashboardService} from "../../passenger-dashboard.service";
import {Passenger} from "../../models/passenger.interface";

@Component({
  selector: 'passenger-viewer',
  styleUrls: ['passenger-viewer.component.css'],
  template: `
  <div>
    <passenger-form
    [detail] ="passenger"
    (update)="onUpdatePassenger($event)">
    </passenger-form>
  </div>
  `
})
export class PassengerViewerComponent implements  OnInit{
  passenger: Passenger | undefined;
  constructor(private passengerService: PassengerDashboardService) {}

  ngOnInit() {
    this.passengerService.getPassenger(1).subscribe((data: Passenger)=>{
      this.passenger = data;
    })
  }

  onUpdatePassenger(event: Passenger){
    this.passengerService.updatePassenger(event).subscribe(passenger => {
      this.passenger = Object.assign({}, passenger, event)
    })
  }
}
