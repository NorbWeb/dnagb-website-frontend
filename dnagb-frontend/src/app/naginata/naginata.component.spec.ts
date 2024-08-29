import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaginataComponent } from './naginata.component';

describe('NaginataComponent', () => {
  let component: NaginataComponent;
  let fixture: ComponentFixture<NaginataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaginataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaginataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
