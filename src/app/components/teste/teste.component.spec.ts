import { TestBed } from '@angular/core/testing';
import { TesteComponent } from './teste.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TesteService } from '../../services/teste/teste.service';

describe('TesteComponent', () => {
  let testServiceSpy: any;
  beforeEach(async () => {
    testServiceSpy = jasmine.createSpyObj('TesteService', ['getValue']);
    await TestBed.configureTestingModule({
      imports: [TesteComponent, HttpClientTestingModule],
      providers: [{ provide: TesteService, useValue: testServiceSpy }],
    }).compileComponents();
  });

  xit('should create', () => {
    const fixture = TestBed.createComponent(TesteComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should update title', async () => {
    // mocks constructor asynchronous request return value
    testServiceSpy.getValue.and.returnValue(Promise.resolve('TEST_VALUE'));

    const fixture = TestBed.createComponent(TesteComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('.content p');

    // before request data
    expect(component.title).withContext('component title before').toEqual('');
    expect(element?.textContent)
      .withContext('template text before')
      .toEqual('');

    // check changes on component class
    await fixture.whenStable();
    // after request data
    expect(component.title)
      .withContext('component title after')
      .toEqual('TEST_VALUE');

    // check changes on template
    fixture.detectChanges();
    expect(element?.textContent)
      .withContext('template text after')
      .toEqual('TEST_VALUE');

    // how many times service method was called
    expect(testServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
