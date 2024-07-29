import { Component } from '@angular/core';

interface Vehicle {
  number: string;
  model: string;
  customer: string;
  billOfMaterial: BillItem[];
}

interface Item {
  name: string;
  cost: number;
}

interface BillItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-service-advisor-dashboard',
  templateUrl: './service-advisor-dashboard.component.html',
  styleUrls: ['./service-advisor-dashboard.component.css'],
})
export class ServiceAdvisorDashboardComponent {
  vehiclesUnderServicing: Vehicle[] = [
    {
      number: '1234',
      model: 'Toyota Corolla',
      customer: 'John Doe',
      billOfMaterial: [],
    },
    {
      number: '5678',
      model: 'Honda Civic',
      customer: 'Jane Smith',
      billOfMaterial: [],
    },
  ];

  availableItems: Item[] = [
    { name: 'Oil Change', cost: 30 },
    { name: 'Wheel Alignment', cost: 50 },
    { name: 'Fuel Filter Change', cost: 20 },
  ];

  newItem: { [key: string]: BillItem } = {};
  searchQuery: string = '';

  constructor() {
    // Initialize newItem object for each vehicle
    this.vehiclesUnderServicing.forEach((vehicle) => {
      this.newItem[vehicle.number] = { name: '', quantity: 1 };
    });
  }

  addItem(vehicle: Vehicle) {
    if (
      this.newItem[vehicle.number].name &&
      this.newItem[vehicle.number].quantity > 0
    ) {
      vehicle.billOfMaterial.push({ ...this.newItem[vehicle.number] });
      this.newItem[vehicle.number] = { name: '', quantity: 1 };
    }
  }

  editItem(vehicle: Vehicle, index: number) {
    const item = vehicle.billOfMaterial[index];
    this.newItem[vehicle.number] = { ...item };
    vehicle.billOfMaterial.splice(index, 1);
  }

  removeItem(vehicle: Vehicle, index: number) {
    vehicle.billOfMaterial.splice(index, 1);
  }

  calculateTotalCost(vehicle: Vehicle): number {
    return vehicle.billOfMaterial.reduce((total, item) => {
      const itemCost = this.getItemCost(item.name);
      return total + itemCost * item.quantity;
    }, 0);
  }

  getItemCost(itemName: string): number {
    const item = this.availableItems.find((i) => i.name === itemName);
    return item ? item.cost : 0;
  }

  filteredVehicles(): Vehicle[] {
    if (!this.searchQuery) return this.vehiclesUnderServicing;
    const query = this.searchQuery.toLowerCase();
    return this.vehiclesUnderServicing.filter(
      (vehicle) =>
        vehicle.number.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query) ||
        vehicle.customer.toLowerCase().includes(query)
    );
  }
}
