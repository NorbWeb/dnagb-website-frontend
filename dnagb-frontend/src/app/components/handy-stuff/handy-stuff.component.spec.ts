import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandyStuffComponent } from './handy-stuff.component';

describe('HandyStuffComponent', () => {
  let component: HandyStuffComponent;
  let fixture: ComponentFixture<HandyStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandyStuffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandyStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
