import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DojosComponent } from './dojos.component';

describe('DojosComponent', () => {
  let component: DojosComponent;
  let fixture: ComponentFixture<DojosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DojosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DojosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
