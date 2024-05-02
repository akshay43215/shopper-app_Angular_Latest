import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHeaderomponent } from './customer-header.component';

describe('CustomerHeaderomponent', () => {
  let component: CustomerHeaderomponent;
  let fixture: ComponentFixture<CustomerHeaderomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerHeaderomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHeaderomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
