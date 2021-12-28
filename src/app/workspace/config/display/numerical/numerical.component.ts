import {Component, Input} from '@angular/core';
import {NumericalConfig} from '../models/configs';
import {NUMERICAL_FIELD_METADATA} from '../models/configs_metadata';
import {DisplayStateNumericalFieldsType} from '../state/display.state';

@Component({
  selector: 'app-numerical',
  templateUrl: './numerical.component.html',
  styleUrls: ['./numerical.component.scss'],
})
export class NumericalComponent {
  @Input() numericalConfig?: NumericalConfig;
  // Name of the state field this config corresponds to.
  @Input() fieldName?: DisplayStateNumericalFieldsType;
  @Input() label = '';

  NUMERICAL_FIELD_METADATA = NUMERICAL_FIELD_METADATA;

  constructor() {}

  valueChanged(value: number, fieldName: keyof NumericalConfig) {
    if (this.numericalConfig && this.fieldName) {
    }
  }
}
