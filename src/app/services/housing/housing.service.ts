import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HousingLocation } from '../../interfaces/housing-location';
import { lastValueFrom } from 'rxjs';
import { HousingApplication } from '../../interfaces/housing-application';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  urlLocations: string = 'http://localhost:3000/locations';
  urlApplications: string = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) {}

  async getFilteredHousingLocations(
    filter?: string
  ): Promise<HousingLocation[]> {
    const query = filter ? `?q=${filter}` : '';
    const url = `${this.urlLocations}${query}`;
    const observable = this.http.get(url);
    const lastValue = await lastValueFrom(observable);
    const housingLocation = lastValue as HousingLocation[];
    return housingLocation || [];
  }

  async getHousingLocationById(
    housingLocationId: number
  ): Promise<HousingLocation> {
    const url = `${this.urlLocations}/${housingLocationId}`;
    const observable = this.http.get(url);
    const lastValue = await lastValueFrom(observable);
    const housingLocation = lastValue as HousingLocation;
    return housingLocation;
  }

  async submitApplication(application: HousingApplication): Promise<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const response = await lastValueFrom(
      this.http.post(this.urlApplications, application, { headers })
    );
    return response as {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
  }
}
