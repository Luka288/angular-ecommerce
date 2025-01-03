import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { randomThreeItemResolver } from './random-three-item.resolver';

describe('randomThreeItemResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => randomThreeItemResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
