import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {Passenger} from "../../models/passenger.interface";

@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.css'],
  template: `
  <div>
        <span
          class="status"
          [class.checked-in]="detail?.checkedIn"></span>

            <div *ngIf="this.editing">
              <input
                type="text"
                [value]="detail?.fullname"
                (input)="onNameChange(name.value)"
                #name>
            </div>

            <div *ngIf="!this.editing">
                {{ detail?.fullname }}
            </div>

            <button (click)="toggleEdit()">{{editing ? 'Done' : 'Edit' }}</button>
            <button (click)="onRemove(detail)">Remove</button>


    <div class="date">
      Check in date:
      {{ detail?.checkInDate ? (detail?.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in' }}
    </div>
  </div>
  `
})
export class PassengerDetailComponent implements OnChanges{
  @Input()
  detail: Passenger | undefined;

  @Output()
  remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  edit: EventEmitter<Passenger> = new EventEmitter<Passenger>()

  editing: boolean = false;
  constructor(){}

  ngOnChanges(changes: any) {
    if(changes.detail)
    this.detail = Object.assign({}, changes.detail.currentValue)
  }

  onNameChange(value: string){
    if(!this.detail) return
    this.detail.fullname = value;
  }

  toggleEdit(){
    if(this.editing){
      this.edit.emit(this.detail)
    }
    this.editing = !this.editing;
  }

  onRemove(value: any){
    this.remove.emit(value)
  }
}
