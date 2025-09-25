import { TestBed } from '@angular/core/testing';

import { SideBarCommunicationService } from './side-bar-communication.service';

describe('SideBarCommunicationService', () => {
  let service: SideBarCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideBarCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
