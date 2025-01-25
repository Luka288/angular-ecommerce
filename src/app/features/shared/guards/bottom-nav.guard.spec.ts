import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bottomNavGuard } from './bottom-nav.guard';

describe('bottomNavGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bottomNavGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
