import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomHtmlComponent } from './custom-html.component';

describe('CustomHtmlComponent', () => {
  let component: CustomHtmlComponent;
  let fixture: ComponentFixture<CustomHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomHtmlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
