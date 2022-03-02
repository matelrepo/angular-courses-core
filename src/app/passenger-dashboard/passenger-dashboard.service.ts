import {Passenger} from "./models/passenger.interface";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

const PASSENGER_API = "http://localhost:3000/passengers"

@Injectable()
export class PassengerDashboardService{
  constructor(private http: HttpClient) {}

  getPassengers(): Observable<Passenger[]>{
    return this.http.get<Passenger[]>(PASSENGER_API);
  }

  getPassenger(id: number){
    return this.http.get<Passenger>(`${PASSENGER_API}/${id}`)
  }

  updatePassenger(passenger: Passenger): Observable<Passenger>{
    return this.http.put<Passenger>(`${PASSENGER_API}/${passenger.id}`, passenger);
  }

  removePassenger(passenger: Passenger): Observable<Passenger>{
    return this.http.delete<Passenger>(`${PASSENGER_API}/${passenger.id}`);
  }
}
