import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ConfigFieldMetadata} from '../../models/configs_metadata';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent {
  @Input() label = '';
  @Input() help?: string;
  @Input() options?: Map<number, string>;
  @Input() value?: number;
  @Input() rightLabel = false;
  @Output() valueChanged = new EventEmitter<number>();

  constructor() {}

  changeValue(value: number) {
    this.value = value;
    this.valueChanged.emit(value);
  }

  onChangeField(event: Event) {
    this.changeValue(Number((event.target as HTMLInputElement).value));
  }
}
