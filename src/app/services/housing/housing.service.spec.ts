import { TestBed } from '@angular/core/testing';
import { HousingService } from './housing.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { NotFoundError, defer } from 'rxjs';
import { HousingLocation } from '../../interfaces/housing-location';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

// https://angular.io/guide/testing-services#httpclienttestingmodule
describe('HousingService', () => {
  beforeEach(() => {});

  it('should be created', () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const housingService = new HousingService(httpClientSpy);
    expect(housingService).toBeTruthy();
  });

  describe('getFilteredHousingLocations', () => {
    it('should return expected housing locations when filter is not defined', async () => {
      const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      const housingService = new HousingService(httpClientSpy);
      const locations: HousingLocation[] = [
        {
          id: 1,
          name: 'Name 1',
          city: 'City 1',
          state: 'State 1',
          photo: '',
          availableUnits: 1,
          laundry: true,
          wifi: true,
        },
      ];
      httpClientSpy.get.and.returnValue(asyncData(locations));
      const response = await housingService.getFilteredHousingLocations();
      expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
      expect(response).withContext('expected response').toEqual(locations);
    });

    it('should return expected housing locations when filter is defined', async () => {
      const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      const housingService = new HousingService(httpClientSpy);
      const filter = 'Name';
      const locations: HousingLocation[] = [
        {
          id: 1,
          name: 'Name 1',
          city: 'City 1',
          state: 'State 1',
          photo: '',
          availableUnits: 1,
          laundry: true,
          wifi: true,
        },
      ];
      httpClientSpy.get.and.returnValue(asyncData(locations));
      const response = await housingService.getFilteredHousingLocations(filter);
      expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
      expect(response).withContext('expected response').toEqual(locations);
    });
  });

  describe('getHousingLocationById', () => {
    it('should return expected housing location', async () => {
      const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      const housingService = new HousingService(httpClientSpy);
      const location: HousingLocation = {
        id: 1,
        name: 'Name 1',
        city: 'City 1',
        state: 'State 1',
        photo: '',
        availableUnits: 1,
        laundry: true,
        wifi: true,
      };

      httpClientSpy.get.and.returnValue(asyncData(location));
      const response = await housingService.getHousingLocationById(1);
      expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
      expect(response).withContext('expected response').toEqual(location);
    });

    it('should return not found error', async () => {
      const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      const housingService = new HousingService(httpClientSpy);
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not Found',
      });
      try {
        httpClientSpy.get.and.returnValue(asyncError(errorResponse));
        const response = await housingService.getHousingLocationById(100);
        expect(true).toBeFalse();
      } catch (error: any) {
        expect(error).toBeDefined();
        expect(error.status).toEqual(HttpStatusCode.NotFound);
        expect(error.message).toEqual(
          'Http failure response for (unknown url): 404 Not Found'
        );
        expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
      }
    });
  });

  describe('submitApplication', () => {
    it('should submit application', async () => {
      const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
      const housingService = new HousingService(httpClientSpy);
      const data = {
        firstName: 'João',
        lastName: 'da Silva',
        email: 'joaodasilva@email.com',
      };
      const expectedResponse = {
        id: 1,
        firstName: 'João',
        lastName: 'da Silva',
        email: 'joaodasilva@email.com',
      };
      httpClientSpy.post.and.returnValue(asyncData(expectedResponse));
      const response = await housingService.submitApplication(data);
      expect(response)
        .withContext('expected response')
        .toEqual(expectedResponse);
    });
  });
});
