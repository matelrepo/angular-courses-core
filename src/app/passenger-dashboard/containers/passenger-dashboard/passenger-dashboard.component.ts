import {Component, OnInit} from "@angular/core";
import {Passenger} from "../../models/passenger.interface";
import {PassengerDashboardService} from "../../passenger-dashboard.service";

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.css'],
  template: `
  <div>

    <passenger-count
      [items]="passengers">
    </passenger-count>
    <div *ngFor="let passenger of passengers">
      {{passenger.fullname}}
    </div>
    <passenger-detail
    *ngFor="let passenger of passengers;"
    [detail]="passenger"
    (remove)="handleRemove($event)"
    (edit)="handleEdit($event)">
    </passenger-detail>

  </div>
`
})
export class PassengerDashboardComponent implements OnInit{
  passengers: Passenger[] =[]

  constructor(private passengerService: PassengerDashboardService){

  }

  ngOnInit() {
    this.passengerService.getPassengers().subscribe(passengers =>{
      this.passengers = passengers;
    });
  }

  handleEdit(event: Passenger){
    this.passengers = this.passengers.map((p: Passenger)=>{
      if(p.id === event.id){
        p = Object.assign({},p, event)
      }
      return p
    })
  }

  handleRemove(event: Passenger){
    this.passengers = this.passengers.filter((p: Passenger)=>{
      return p.id !== event.id
    })
  }

}
