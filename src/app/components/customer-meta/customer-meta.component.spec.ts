import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMetaComponent } from './customer-meta.component';

describe('CustomerMetaComponent', () => {
  let component: CustomerMetaComponent;
  let fixture: ComponentFixture<CustomerMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
