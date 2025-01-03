import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { singleItemResolver } from './single-item.resolver';

describe('singleItemResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => singleItemResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
