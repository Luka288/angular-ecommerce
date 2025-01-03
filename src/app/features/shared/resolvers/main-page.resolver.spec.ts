import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { mainPageResolver } from './main-page.resolver';

describe('mainPageResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => mainPageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
