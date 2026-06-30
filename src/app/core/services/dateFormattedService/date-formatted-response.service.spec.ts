import { TestBed } from '@angular/core/testing';

import { DateFormattedResponseService } from './date-formatted-response.service';

describe('DateFormattedResponseService', () => {
  let service: DateFormattedResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFormattedResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
