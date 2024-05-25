import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ride } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.scss'],
})
export class RideListComponent implements OnInit {
  rides$!: Observable<Ride[]>;

  constructor(private rideService: RideService, private router: Router) {}

  ngOnInit(): void {
    this.rides$ = this.rideService.rides$;
  }

  selectRide(id: string): void {
    this.router.navigate(['/ride', id]);
  }
}
