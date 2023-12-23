import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { HousingService } from '../../services/housing/housing.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HousingLocation } from '../../interfaces/housing-location';

describe('DetailsComponent', () => {
  let testServiceSpy: any;
  const baseUrl = 'http://localhost:9876';

  beforeEach(async () => {
    testServiceSpy = jasmine.createSpyObj('HousingService', [
      'getHousingLocationById',
    ]);
    await TestBed.configureTestingModule({
      imports: [DetailsComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ housingLocationId: '1' }),
            snapshot: convertToParamMap({ housingLocationId: '1' }),
          },
        },
        { provide: HousingService, useValue: testServiceSpy },
      ],
    }).compileComponents();
  });

  xit('should create', () => {
    const fixture = TestBed.createComponent(DetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should load house location data from service', async () => {
    const housingLocation: HousingLocation = {
      id: 0,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: '/assets/bernard-hermant-CLKGGwIBTaY-unsplash.jpg',
      availableUnits: 4,
      wifi: true,
      laundry: true,
    };
    testServiceSpy.getHousingLocationById.and.returnValue(
      Promise.resolve(housingLocation)
    );

    const fixture = TestBed.createComponent(DetailsComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement;

    // check changes on component class
    await fixture.whenStable();

    expect(component.housingLocation)
      .withContext('component.housingLocation loaded data')
      .toEqual(housingLocation);

    fixture.detectChanges();

    // photo
    const img = compiled.querySelector(
      'article img.listing-photo'
    ) as HTMLImageElement;
    expect(img).withContext('image is defined').toBeDefined();
    expect(img.src)
      .withContext('image src')
      .toEqual(baseUrl + housingLocation.photo);

    // name
    const nameElement = compiled.querySelector(
      'article section.listing-description h2.listing-heading'
    ) as HTMLElement;
    expect(nameElement).withContext('location name is defined').toBeDefined();
    expect(nameElement?.textContent)
      .withContext('location name text')
      .toEqual(`${housingLocation?.name}`);

    // location
    const locationElement = compiled.querySelector(
      'article section.listing-description p.listing-location'
    ) as HTMLElement;
    expect(locationElement).withContext('location is defined').toBeDefined();
    expect(locationElement?.textContent)
      .withContext('location text')
      .toEqual(` ${housingLocation?.city}, ${housingLocation?.state} `);

    // about title
    const aboutTitleElement = compiled.querySelector(
      'article section.listing-features h2.section-heading'
    ) as HTMLElement;
    expect(aboutTitleElement).withContext('About header').toBeDefined();
    expect(aboutTitleElement?.textContent)
      .withContext('About header text')
      .toEqual(`About this housing location`);

    // about list
    const aboutItems = compiled.querySelector(
      'article .listing-features ul'
    ) as HTMLUListElement;
    expect(aboutItems).not.toBeNull();
    expect(aboutItems.childElementCount).toEqual(3);

    // avaiable units
    const unitsAvaiableItem = aboutItems.children[0];
    expect(unitsAvaiableItem).not.toBeNull();
    expect(unitsAvaiableItem.textContent).toEqual(
      `Units avaiable: ${housingLocation?.availableUnits}`
    );

    // wifi
    const wifiItem = aboutItems.children[1];
    expect(wifiItem).not.toBeNull();
    expect(wifiItem.textContent).toEqual(
      ` Does this location have wifi: ${housingLocation?.wifi ? 'Yes' : 'No'} `
    );

    // laundry
    const laundryItem = aboutItems.children[2];
    expect(laundryItem).not.toBeNull();
    expect(laundryItem.textContent).toEqual(
      ` Does this location have laundry: ${
        housingLocation?.laundry ? 'Yes' : 'No'
      } `
    );

    // apply header
    const applyHeading = compiled.querySelector(
      'article section.listing-apply h2.section-heading'
    ) as HTMLHeadElement;
    expect(applyHeading).not.toBeNull();
    expect(applyHeading.textContent).toEqual('Apply now to live here');

    // first name
    const firstNameLabel = compiled.querySelector(
      'article section.listing-apply form label[for="first-name"]'
    );
    expect(firstNameLabel).withContext('first name label').not.toBeNull();
    expect(firstNameLabel.textContent)
      .withContext('first name label text')
      .toEqual('First name');

    const firstNameInput = compiled.querySelector(
      'article section.listing-apply form input[id="first-name"][type="text"][formControlName="firstName"]'
    );
    expect(firstNameInput).withContext('first name input').not.toBeNull();
    expect(firstNameInput.value).toEqual('');

    // last name
    const lastNameLabel = compiled.querySelector(
      'article section.listing-apply form label[for="last-name"]'
    );
    expect(lastNameLabel).withContext('last name label').not.toBeNull();
    expect(lastNameLabel.textContent)
      .withContext('last name label text')
      .toEqual('Last name');

    const lastNameInput = compiled.querySelector(
      'article section.listing-apply form input[id="last-name"][type="text"][formControlName="lastName"]'
    );
    expect(lastNameInput).withContext('last name input').not.toBeNull();
    expect(lastNameInput.value).toEqual('');

    // email
    const emailLabel = compiled.querySelector(
      'article section.listing-apply form label[for="email"]'
    );
    expect(emailLabel).withContext('email label').not.toBeNull();
    expect(emailLabel.textContent)
      .withContext('email label text')
      .toEqual('Email');

    const emailInput = compiled.querySelector(
      'article section.listing-apply form input[id="email"][type="text"][formControlName="email"]'
    );
    expect(emailInput).withContext('email input').not.toBeNull();
    expect(emailInput.value).toEqual('');

    // button
    const submitButton = compiled.querySelector(
      'article section.listing-apply form button[type="submit"]'
    ) as HTMLButtonElement;
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toEqual('Apply Now');
  });

  it('should fill submit the form', async () => {
    const fixture = TestBed.createComponent(DetailsComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement;

    // check changes on component class
    await fixture.whenStable();

    fixture.detectChanges();

    const submitButton = compiled.querySelector(
      'article section.listing-apply form button[type="submit"]'
    ) as HTMLButtonElement;

    component.applyForm.controls.firstName.setValue('João');
    component.applyForm.controls.lastName.setValue('da Silva');
    component.applyForm.controls.lastName.setValue('da Silva');

    await submitButton.click();

    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.applyForm.controls.firstName.value).toEqual('');
    // expect(component.applyForm.controls.lastName.value).toEqual('');
    // expect(component.applyForm.controls.email.value).toEqual('');
  });
});
