import { TestBed } from '@angular/core/testing';

import { SearchBooleanService } from './search-boolean.service';

describe('SearchBooleanService', () => {
  let service: SearchBooleanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBooleanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
