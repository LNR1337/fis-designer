import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.scss'],
})
export class ColorInputComponent {
  @Input() label = '';
  @Input() hint?: string;
  @Input() value?: string;

  @Output() valueChanged = new EventEmitter<string>();

  constructor() {}

  changeValue(value: string) {
    this.value = value;
    this.valueChanged.emit(value);
  }

  onChangeField(event: Event) {
    this.changeValue((event.target as HTMLInputElement).value);
  }
}
