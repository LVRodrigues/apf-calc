import { TestBed } from '@angular/core/testing';

import { ApfService } from './apf.service';

describe('ApfService', () => {
  let service: ApfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
