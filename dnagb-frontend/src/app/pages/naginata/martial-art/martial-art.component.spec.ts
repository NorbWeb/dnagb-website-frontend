import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtComponent } from './martial-art.component';

describe('MartialArtComponent', () => {
  let component: MartialArtComponent;
  let fixture: ComponentFixture<MartialArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MartialArtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MartialArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
