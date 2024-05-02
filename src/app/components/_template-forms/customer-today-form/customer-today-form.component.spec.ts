import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTodayFormComponent } from './customer-today-form.component';

describe('CustomerTodayFormComponent', () => {
  let component: CustomerTodayFormComponent;
  let fixture: ComponentFixture<CustomerTodayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTodayFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerTodayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
