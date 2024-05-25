import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RideListComponent } from './components/ride-list/ride-list.component';
import { RideFormComponent } from './components/ride-form/ride-form.component';
import { RideDetailComponent } from './components/ride-detail/ride-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/rides', pathMatch: 'full' },
  { path: 'rides', component: RideListComponent },
  { path: 'ride/new', component: RideFormComponent },
  { path: 'ride/:id', component: RideDetailComponent },
  { path: '**', redirectTo: '/rides' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
