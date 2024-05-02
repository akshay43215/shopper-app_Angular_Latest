import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNcaMetaComponent } from './customer-nca-meta.component';

describe('CustomerNcaMetaComponent', () => {
  let component: CustomerNcaMetaComponent;
  let fixture: ComponentFixture<CustomerNcaMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerNcaMetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerNcaMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
