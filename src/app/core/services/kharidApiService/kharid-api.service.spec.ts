import { TestBed } from '@angular/core/testing';

import { KharidApiService } from './kharid-api.service';

describe('KharidApiService', () => {
  let service: KharidApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KharidApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
