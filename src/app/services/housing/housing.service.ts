import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HousingLocation } from '../../interfaces/housing-location';
import { lastValueFrom } from 'rxjs';
import { HousingApplication } from '../../interfaces/housing-application';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url: string = 'http://localhost:3000/locations';

  constructor(private http: HttpClient) {}

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    const housingLocations = ((await data.json()) ?? []) as HousingLocation[];
    return housingLocations;
  }

  async getFilteredHousingLocations(
    filter: string
  ): Promise<HousingLocation[]> {
    const housingLocation = (await lastValueFrom(
      this.http.get(`${this.url}?q=${filter}`)
    )) as HousingLocation[];
    return housingLocation || [];
  }

  async getHousingLocationById(
    housingLocationId: number
  ): Promise<HousingLocation> {
    const housingLocation = (await lastValueFrom(
      this.http.get(`${this.url}/${housingLocationId}`)
    )) as HousingLocation;
    console.error(housingLocation);
    return housingLocation;
  }

  async submitApplication(application: HousingApplication) {
    console.log(application);
  }
}
