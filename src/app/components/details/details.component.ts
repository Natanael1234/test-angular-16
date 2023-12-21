import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HousingApplication } from '../../interfaces/housing-application';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../../interfaces/housing-location';
import { HousingService } from '../../services/housing/housing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  housingService: HousingService = inject(HousingService);
  housingLocation?: HousingLocation | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    this.getHousingLocation();
  }

  async getHousingLocation() {
    const housingLoactionId = Number(
      this.route.snapshot.params['housingLocationId']
    );
    this.housingLocation = await this.housingService.getHousingLocationById(
      housingLoactionId
    );
  }

  async submitApplication() {
    const housingApplication =
      this.applyForm.getRawValue() as HousingApplication;
    await this.housingService.submitApplication(housingApplication);
    this.applyForm.controls.lastName.setValue('');
    this.applyForm.controls.firstName.setValue('');
    this.applyForm.controls.email.setValue('');
  }
}
