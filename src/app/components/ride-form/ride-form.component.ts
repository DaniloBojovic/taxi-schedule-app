import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Ride } from 'src/app/models/ride.model';
import { NotificationService } from 'src/app/services/notification.service';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-form',
  templateUrl: './ride-form.component.html',
  styleUrls: ['./ride-form.component.scss'],
})
export class RideFormComponent implements OnInit {
  rideForm!: FormGroup;
  isCardPayment = false;

  constructor(
    private fb: FormBuilder,
    private rideService: RideService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.rideForm = this.fb.group({
      startAddress: ['', Validators.required],
      destinationAddress: ['', Validators.required],
      departureDateTime: ['', Validators.required],
      passengerPhone: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardNumber: [''],
      cardExpirationDate: [''],
      price: [null, { disabled: true }],
    });

    this.rideForm.get('paymentMethod')?.valueChanges.subscribe((value) => {
      this.onPaymentMethodChange(value);
    });

    this.rideForm
      .get('startAddress')
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.calculatePrice();
      });

    this.rideForm
      .get('destinationAddress')
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.handleAddressChange();
      });
  }

  private handleAddressChange(): void {
    const startAddress = this.rideForm.get('startAddress')?.value;
    const destinationAddress = this.rideForm.get('destinationAddress')?.value;

    if (startAddress && destinationAddress) {
      this.calculatePrice();
    } else {
      this.rideForm.get('price')?.reset();
      this.rideForm.get('price')?.disable();
    }
  }

  onPaymentMethodChange(paymentMethod: string): void {
    if (paymentMethod === 'Card') {
      this.isCardPayment = true;
      this.rideForm
        .get('cardNumber')
        ?.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]{16}$'),
        ]);
      this.rideForm
        .get('cardExpirationDate')
        ?.setValidators([Validators.required]);
    } else {
      this.isCardPayment = false;
      this.rideForm.get('cardNumber')?.clearValidators();
      this.rideForm.get('cardExpirationDate')?.clearValidators();
    }
    this.rideForm.get('cardNumber')?.updateValueAndValidity();
    this.rideForm.get('cardExpirationDate')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.rideForm.valid) {
      const formValue = this.rideForm.getRawValue();
      const newRide: Ride = {
        id: this.generateUniqueId(),
        startAddress: formValue.startAddress,
        destinationAddress: formValue.destinationAddress,
        departureDateTime: new Date(formValue.departureDateTime),
        passengerPhone: formValue.passengerPhone,
        paymentMethod: formValue.paymentMethod,
        cardNumber: formValue.cardNumber,
        cardExpirationDate: formValue.cardExpirationDate,
        price: formValue.price,
      };

      this.rideService.addRide(newRide);
      this.rideForm.reset();
      this.notificationService.showSuccess('Ride added successfully!');
    }
  }

  private generateUniqueId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  calculatePrice(): void {
    const startAddress = this.rideForm.get('startAddress')?.value;
    const destinationAddress = this.rideForm.get('destinationAddress')?.value;

    if (startAddress && destinationAddress) {
      const price = this.calculateRandomPrice(startAddress, destinationAddress);
      this.rideForm.get('price')?.enable();
      this.rideForm.patchValue({ price });
    } else {
      this.rideForm.get('price')?.reset();
      this.rideForm.get('price')?.disable();
    }
  }

  private calculateRandomPrice(
    startAddress: string,
    destinationAddress: string
  ): number {
    return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
  }
}
