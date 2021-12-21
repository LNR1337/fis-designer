import {LoadImagesDialogComponent} from './load-images-dialog.component';
import {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';

describe('ImageSelectorDialog', () => {
  let component: LoadImagesDialogComponent;
  let fixture: ComponentFixture<LoadImagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadImagesDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
