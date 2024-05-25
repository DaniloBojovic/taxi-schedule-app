import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideDetailComponent } from './ride-detail.component';

describe('RideDetailComponent', () => {
  let component: RideDetailComponent;
  let fixture: ComponentFixture<RideDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RideDetailComponent]
    });
    fixture = TestBed.createComponent(RideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
