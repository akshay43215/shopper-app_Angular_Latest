import { TestBed } from '@angular/core/testing';

import { apiService } from './apiService.Service';

describe('CommonService', () => {
  let service: apiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(apiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
