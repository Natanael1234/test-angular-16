import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teste2Component } from './teste2.component';

describe('Teste2Component', () => {
  let component: Teste2Component;
  let fixture: ComponentFixture<Teste2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Teste2Component]
    });
    fixture = TestBed.createComponent(Teste2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
