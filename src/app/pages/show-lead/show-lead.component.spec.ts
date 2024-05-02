import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLeadComponent } from './show-lead.component';

describe('ShowLeadComponent', () => {
  let component: ShowLeadComponent;
  let fixture: ComponentFixture<ShowLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
