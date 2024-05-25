import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ride } from '../models/ride.model';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private ridesSubject = new BehaviorSubject<Ride[]>([]);
  rides$: Observable<Ride[]> = this.ridesSubject.asObservable();

  constructor() {}

  addRide(ride: Ride): void {
    const currentRides = this.ridesSubject.getValue();
    const updatedRides = [...currentRides, ride];
    this.ridesSubject.next(updatedRides);
  }

  getRideById(id: string): Ride | undefined {
    const currentRides = this.ridesSubject.getValue();
    return currentRides.find((ride) => ride.id === id);
  }
}
