import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCardComponent } from './staff-card.component';

describe('StaffCardComponent', () => {
  let component: StaffCardComponent;
  let fixture: ComponentFixture<StaffCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
