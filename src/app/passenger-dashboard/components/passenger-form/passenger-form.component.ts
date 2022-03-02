import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Passenger} from "../../models/passenger.interface";
import {Baggage} from "../../models/baggage.interface";

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.css'],
  template: `
  <form (ngSubmit)="handleFormSubmit(form.value, form.valid)" #form="ngForm" novalidate>
    {{detail | json}}

    <div>
      Passenger name:
      <input
        type="text"
        name="fullname"
        required
        #fullname ="ngModel"
        [ngModel]="detail?.fullname">
    </div>
    <div *ngIf="fullname.errors?.['required'] && fullname.dirty" class="error">
      Passenger name is required
    </div>

    <div>
      Passenger ID:
      <input
        type="number"
        name="id"
        [ngModel]="detail?.id">
    </div>

    <div>
      <label>
        <input
          type="radio"
          [value]="true"
          name="checkedIn"
          [ngModel]="detail?.checkedIn"
          (ngModelChange)="toggleCheckedIn($event)">
        Yes
      </label>
      <label>
        <input
          type="radio"
          [value]="false"
          name="checkedIn"
          [ngModel]="detail?.checkedIn"
          (ngModelChange)="toggleCheckedIn($event)">
        No
      </label>
    </div>

    <div *ngIf="form.value.checkedIn">
      Check in date:
      <input
        type="number"
        name="checkedInDate"
        [ngModel]="detail?.checkInDate">
    </div>

    <div>
      Luggage:
      <select
        name="baggage"
        [ngModel]="detail?.baggage">
        <option
          *ngFor="let item of baggage"
          [value]="item.key"
          [selected]="item.key === detail?.baggage">
          {{ item.value }}
        </option>
      </select>
    </div>

      <button type="submit" [disabled]="form.invalid">
        Update passenger
      </button>

  </form>
  `
})
export class PassengerFormComponent{

  @Input()
  detail: Passenger | undefined

  baggage: Baggage[] = [{
    key: 'none',
    value: 'No baggage'
  },{
    key: 'hand-only',
    value: 'Hand baggage'
  },{
    key: 'hold-only',
    value: 'Hold baggage'
  },{
    key: 'hand-hold',
    value: 'Hand and hold baggage'
  }];

  @Output()
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>()

  toggleCheckedIn(checkedIn: boolean){
    if(checkedIn && this.detail){
      this.detail.checkInDate = Date.now();
    }
  }

  handleFormSubmit(passenger: Passenger, isValid: Boolean | null){
    if(isValid){
      this.update.emit(passenger);
    }
  }

}
