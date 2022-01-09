import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {ConfigFieldMetadata} from '../../../models/configs_metadata';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss'],
  host: {'[class.wide]': 'metaData?.wide'},
})
export class SimpleInputComponent implements OnChanges {
  @Input() metaData?: ConfigFieldMetadata;
  @Input() type: 'color' | 'text' | 'select' = 'text';
  @Input() value?: number | string;
  // Options provided here will override the ones from metadata.
  @Input() options?: Map<number, string>;
  @Output() stringChanged = new EventEmitter<string>();
  @Output() numberChanged = new EventEmitter<number>();

  realOptions: Array<[number, string]> = [];
  filteredOptions: Array<[number, string]> = [];

  constructor() {}

  changeValue(value: string | number) {
    if (typeof value === 'string') {
      this.stringChanged.emit(value);
    }
    if (typeof value === 'number') {
      this.numberChanged.emit(value);
    }
  }

  filterOptions(search: string) {
    this.filteredOptions = this.realOptions.filter(element =>
      element[1].toLowerCase().includes(search.toLowerCase())
    );
  }

  onChangeField(event: Event) {
    this.changeValue((event.target as HTMLInputElement).value);
  }

  optionTrackBy(index: number, item: [number, string]) {
    return item[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] || changes['metaData']) {
      this.realOptions = Array.from(
        this.options?.entries() || this.metaData?.options?.entries() || []
      );
      this.filteredOptions = this.realOptions;
    }
  }
}
