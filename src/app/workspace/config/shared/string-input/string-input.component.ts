import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: ['./string-input.component.scss'],
})
export class StringInputComponent {
  @Input() label = '';
  @Input() help?: string;
  @Input() value?: string;
  @Input() maxLength?: number;
  @Input() type: 'color' | 'text' = 'text';
  @Input() rightLabel = false;
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
