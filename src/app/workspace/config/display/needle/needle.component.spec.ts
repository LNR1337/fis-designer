import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NeedleComponent} from './needle.component';

describe('NeedleComponent', () => {
  let component: NeedleComponent;
  let fixture: ComponentFixture<NeedleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NeedleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
