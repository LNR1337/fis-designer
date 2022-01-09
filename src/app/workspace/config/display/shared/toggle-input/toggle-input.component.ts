import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.scss'],
})
export class ToggleInputComponent {
  @Input() label = '';
  @Input() help?: string;
  @Input() value?: boolean;
  @Input() rightLabel = false;

  @Output() valueChanged = new EventEmitter<boolean>();

  constructor() {}

  changeValue(value: boolean) {
    this.value = value;
    this.valueChanged.emit(value);
  }

  onChangeToggle(event: MatSlideToggleChange) {
    this.changeValue(event.checked);
  }
}
