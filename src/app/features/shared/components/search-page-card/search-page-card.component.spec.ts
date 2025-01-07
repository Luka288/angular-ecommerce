import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageCardComponent } from './search-page-card.component';

describe('SearchPageCardComponent', () => {
  let component: SearchPageCardComponent;
  let fixture: ComponentFixture<SearchPageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPageCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
