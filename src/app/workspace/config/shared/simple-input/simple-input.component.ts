import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ConfigFieldMetadata} from '../../models/configs_metadata';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss'],
  host: {'[class.wide]': 'metaData?.wide'},
})
export class SimpleInputComponent {
  @Input() metaData?: ConfigFieldMetadata;
  @Input() type: 'color' | 'text' | 'select' = 'text';
  @Input() value?: number | string;
  // Options provided here will override the ones from metadata.
  @Input() options?: Map<number, string>;
  @Output() stringChanged = new EventEmitter<string>();
  @Output() numberChanged = new EventEmitter<number>();

  constructor() {}

  changeValue(value: string | number) {
    if (typeof value === 'string') {
      this.stringChanged.emit(value);
    }
    if (typeof value === 'number') {
      this.numberChanged.emit(value);
    }
  }

  onChangeField(event: Event) {
    this.changeValue((event.target as HTMLInputElement).value);
  }

  optionTrackBy(index: number, value: {key: number; value: string}) {
    return value.key;
  }
}
