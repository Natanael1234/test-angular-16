import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingService } from '../../services/housing/housing.service';
import { HousingLocation } from '../../interfaces/housing-location';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService);
  filtetedHousingLocationList: HousingLocation[] = [];

  constructor() {
    this.listHousingLocations();
  }

  async listHousingLocations() {
    this.filtetedHousingLocationList =
      await this.housingService.getFilteredHousingLocations('');
  }

  async filterResults(filter: string) {
    this.filtetedHousingLocationList =
      await this.housingService.getFilteredHousingLocations(filter);
  }
}
