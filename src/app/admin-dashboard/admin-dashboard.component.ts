import { Component } from '@angular/core';
import jsPDF from 'jspdf';

interface Vehicle {
  number: string;
  model: string;
  customer: string;
  billOfMaterial?: BillItem[];
}

interface BillItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  // Arrays to store vehicles in different states
  vehiclesDueForServicing: Vehicle[] = [
    { number: '1234', model: 'Toyota Corolla', customer: 'John Doe' },
    { number: '5678', model: 'Honda Civic', customer: 'Jane Smith' },
  ];

  vehiclesUnderServicing: Vehicle[] = [];

  servicedVehicles: Vehicle[] = [
    {
      number: '121314',
      model: 'Chevrolet Malibu',
      customer: 'Bob Brown',
      billOfMaterial: [
        { name: 'Oil Change', quantity: 2 },
        { name: 'Fuel Filter Change', quantity: 1 },
      ],
    },
  ];

  // New vehicle details
  newVehicle: Vehicle = { number: '', model: '', customer: '' };

  // Move a vehicle from "Due for Servicing" to "Under Servicing"
  scheduleVehicle(vehicle: Vehicle) {
    this.vehiclesDueForServicing = this.vehiclesDueForServicing.filter(
      (v) => v !== vehicle
    );
    this.vehiclesUnderServicing.push({ ...vehicle, billOfMaterial: [] });
  }

  // Move a vehicle from "Under Servicing" to "Serviced"
  moveToServiced(vehicle: Vehicle) {
    this.vehiclesUnderServicing = this.vehiclesUnderServicing.filter(
      (v) => v !== vehicle
    );
    this.servicedVehicles.push(vehicle);
  }

  // Generate a bill in PDF format for a serviced vehicle
  generateBill(vehicle: Vehicle) {
    if (!vehicle.billOfMaterial) return;

    const doc = new jsPDF();
    doc.text('Vehicle Service Bill', 10, 10);
    doc.text(`Vehicle Number: ${vehicle.number}`, 10, 20);
    doc.text(`Model: ${vehicle.model}`, 10, 30);
    doc.text(`Customer: ${vehicle.customer}`, 10, 40);

    let y = 50;
    let totalCost = 0;

    vehicle.billOfMaterial.forEach((item) => {
      const cost = this.getItemCost(item.name);
      totalCost += cost * item.quantity;
      doc.text(
        `${item.name} - Quantity: ${item.quantity} - Cost: $${
          cost * item.quantity
        }`,
        10,
        y
      );
      y += 10;
    });

    doc.text(`Total Cost: $${totalCost}`, 10, y);
    doc.save(`Bill_${vehicle.number}.pdf`);
  }

  // Retrieve the cost of a specific item
  getItemCost(itemName: string): number {
    const itemCosts: { [key: string]: number } = {
      'Oil Change': 30,
      'Wheel Alignment': 50,
      'Fuel Filter Change': 20,
    };
    return itemCosts[itemName] || 0;
  }

  // Add a new vehicle to the "Due for Servicing" list
  addVehicle() {
    if (
      this.newVehicle.number &&
      this.newVehicle.model &&
      this.newVehicle.customer
    ) {
      this.vehiclesDueForServicing.push({ ...this.newVehicle });
      this.newVehicle = { number: '', model: '', customer: '' };
    } else {
      alert('Please fill out all fields');
    }
  }
}
