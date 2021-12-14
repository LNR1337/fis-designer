import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelectorDialog } from './image-selector.component';

describe('ImageSelectorDialog', () => {
  let component: ImageSelectorDialog;
  let fixture: ComponentFixture<ImageSelectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSelectorDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSelectorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
