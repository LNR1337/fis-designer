import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";

@Component({
  selector: 'app-sliding-input',
  templateUrl: './sliding-input.component.html',
  styleUrls: ['./sliding-input.component.scss']
})
export class SlidingInputComponent {
  @Input() label: string = '';
  @Input() hint?: string;
  @Input() min?: number;
  @Input() max?: number;
  @Input() value?: number;

  @Output() valueChanged = new EventEmitter<number>();

  constructor() {
  }

  get showSlider(): boolean {
    return (this.min !== undefined && this.max !== undefined);
  }

  changeValue(value: number) {
    if (this.min !== undefined && value < this.min) {
      value = this.min;
    }
    if (this.max !== undefined && value > this.max) {
      value = this.max;
    }
    this.value = value;
    this.valueChanged.emit(value);
  }

  onChangeSlider(event: MatSliderChange) {
    this.changeValue(event.value!);
  }

  onChangeField(event: Event) {
    this.changeValue(Number((event.target as HTMLInputElement).value));
  }
}
