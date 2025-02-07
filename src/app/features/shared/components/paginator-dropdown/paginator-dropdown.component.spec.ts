import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorDropdownComponent } from './paginator-dropdown.component';

describe('PaginatorDropdownComponent', () => {
  let component: PaginatorDropdownComponent;
  let fixture: ComponentFixture<PaginatorDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
