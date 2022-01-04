import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';
import {ConfigFieldMetadata} from '../../models/configs_metadata';

@Component({
  selector: 'app-sliding-input',
  templateUrl: './sliding-input.component.html',
  styleUrls: ['./sliding-input.component.scss'],
})
export class SlidingInputComponent {
  @Input() metaData?: ConfigFieldMetadata;
  @Input() value?: number;
  @Input() rightLabel = false;
  @Output() valueChanged = new EventEmitter<number>();

  constructor() {}

  get showSlider(): boolean {
    return (
      !!this.metaData &&
      !this.metaData.hideSlider &&
      this.metaData.min !== undefined &&
      this.metaData.max !== undefined
    );
  }

  changeValue(value: number) {
    if (this.metaData && this.metaData.min !== undefined && value < this.metaData.min) {
      value = this.metaData.min;
    }
    if (this.metaData && this.metaData.max !== undefined && value > this.metaData.max) {
      value = this.metaData.max;
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
