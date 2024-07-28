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
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  vehiclesDueForServicing: Vehicle[] = [
    { number: '1234', model: 'Toyota Corolla', customer: 'John Doe' },
    { number: '5678', model: 'Honda Civic', customer: 'Jane Smith' }
  ];

  vehiclesUnderServicing: Vehicle[] = [];

  servicedVehicles: Vehicle[] = [
    { number: '121314', model: 'Chevrolet Malibu', customer: 'Bob Brown', billOfMaterial: [
        { name: 'Oil Change', quantity: 2 },
        { name: 'Fuel Filter Change', quantity: 1 }
      ]
    }
  ];

  newVehicle: Vehicle = { number: '', model: '', customer: '' };

  moveToServiced(vehicle: Vehicle) {
    this.vehiclesUnderServicing = this.vehiclesUnderServicing.filter(v => v !== vehicle);
    this.servicedVehicles.push(vehicle);
  }

  generateBill(vehicle: Vehicle) {
    if (!vehicle.billOfMaterial) return;

    const doc = new jsPDF();
    doc.text('Vehicle Service Bill', 10, 10);
    doc.text(`Vehicle Number: ${vehicle.number}`, 10, 20);
    doc.text(`Model: ${vehicle.model}`, 10, 30);
    doc.text(`Customer: ${vehicle.customer}`, 10, 40);

    let y = 50;
    let totalCost = 0;
    vehicle.billOfMaterial.forEach(item => {
      const cost = this.getItemCost(item.name);
      totalCost += cost * item.quantity;
      doc.text(`${item.name} - Quantity: ${item.quantity} - Cost: $${cost * item.quantity}`, 10, y);
      y += 10;
    });

    doc.text(`Total Cost: $${totalCost}`, 10, y);

    doc.save(`Bill_${vehicle.number}.pdf`);
  }

  getItemCost(itemName: string): number {
    const itemCosts: { [key: string]: number } = {
      'Oil Change': 30,
      'Wheel Alignment': 50,
      'Fuel Filter Change': 20
    };
    return itemCosts[itemName] || 0;
  }

  addVehicle() {
    this.vehiclesDueForServicing.push({ ...this.newVehicle });
    this.newVehicle = { number: '', model: '', customer: '' };
  }

  scheduleVehicle(vehicle: Vehicle) {
    // Move vehicle from "Due for Servicing" to "Under Servicing"
    this.vehiclesDueForServicing = this.vehiclesDueForServicing.filter(v => v !== vehicle);
    // Ensure that the vehicle is added to "Under Servicing" list with an empty Bill of Material
    this.vehiclesUnderServicing.push({ ...vehicle, billOfMaterial: [] });
  }
}
