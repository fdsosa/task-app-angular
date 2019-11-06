import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('JoinFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoinFormService = TestBed.get(JoinFormService);
    expect(service).toBeTruthy();
  });
});
