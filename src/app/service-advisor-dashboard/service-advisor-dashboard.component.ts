import { Component } from '@angular/core';

interface Vehicle {
  number: string;
  model: string;
  customer: string;
  billOfMaterial: BillItem[];
}

interface Item {
  name: string;
  cost: number; // Fixed cost
}

interface BillItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-service-advisor-dashboard',
  templateUrl: './service-advisor-dashboard.component.html',
  styleUrls: ['./service-advisor-dashboard.component.css']
})
export class ServiceAdvisorDashboardComponent {
  vehiclesUnderServicing: Vehicle[] = [
    { number: '1234', model: 'Toyota Corolla', customer: 'John Doe', billOfMaterial: [] },
    { number: '5678', model: 'Honda Civic', customer: 'Jane Smith', billOfMaterial: [] }
  ];

  availableItems: Item[] = [
    { name: 'Oil Change', cost: 30 },
    { name: 'Wheel Alignment', cost: 50 },
    { name: 'Fuel Filter Change', cost: 20 }
  ];

  newItem: { [key: string]: BillItem } = {};

  constructor() {
    // Initialize newItem object for each vehicle
    this.vehiclesUnderServicing.forEach(vehicle => {
      this.newItem[vehicle.number] = { name: '', quantity: 1 };
    });
  }

  addItem(vehicle: Vehicle) {
    if (this.newItem[vehicle.number].name && this.newItem[vehicle.number].quantity > 0) {
      vehicle.billOfMaterial.push({ ...this.newItem[vehicle.number] });
      this.newItem[vehicle.number] = { name: '', quantity: 1 };
    }
  }
}
