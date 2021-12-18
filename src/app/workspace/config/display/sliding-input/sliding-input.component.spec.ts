import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingInputComponent } from './sliding-input.component';

describe('SlidingInputComponent', () => {
  let component: SlidingInputComponent;
  let fixture: ComponentFixture<SlidingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidingInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
