import { TestBed } from '@angular/core/testing';

import { SaveItemsService } from './save-items.service';

describe('SaveItemsService', () => {
  let service: SaveItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
