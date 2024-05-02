import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTodayMetaComponent } from './customer-today-meta.component';

describe('CustomerTodayMetaComponent', () => {
  let component: CustomerTodayMetaComponent;
  let fixture: ComponentFixture<CustomerTodayMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTodayMetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerTodayMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
