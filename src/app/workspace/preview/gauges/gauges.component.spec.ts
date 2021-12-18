import {GaugesComponent} from './gauges.component';
import {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';

describe('DisplayComponent', () => {
  let component: GaugesComponent;
  let fixture: ComponentFixture<GaugesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GaugesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
