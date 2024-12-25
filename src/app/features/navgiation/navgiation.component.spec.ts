import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavgiationComponent } from './navgiation.component';

describe('NavgiationComponent', () => {
  let component: NavgiationComponent;
  let fixture: ComponentFixture<NavgiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavgiationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavgiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
