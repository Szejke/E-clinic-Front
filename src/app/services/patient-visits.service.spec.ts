import { TestBed, inject } from '@angular/core/testing';

import { PatientVisitsService } from './patient-visits.service';

describe('PatientVisitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientVisitsService]
    });
  });

  it('should be created', inject([PatientVisitsService], (service: PatientVisitsService) => {
    expect(service).toBeTruthy();
  }));
});
