import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Adjust path if necessary

interface Vehicle {
  number: string;
  model: string;
  customerName: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/vehicles`; // Adjust as per your API URL

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  getVehicle(number: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${number}`);
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

  updateVehicle(number: string, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${number}`, vehicle);
  }

  deleteVehicle(number: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${number}`);
  }
}
