import { Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

const routeConfig: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  {
    path: 'details/:housingLocationId',
    component: DetailsComponent,
    title: 'Details Page',
  },
];

export default routeConfig;
