import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {NumericalConfig} from '../models/configs';
import {NUMERICAL_FIELD_METADATA} from '../models/configs_metadata';
import {changedNeedleConfig, changedNumericalConfig} from '../state/display.actions';
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

  constructor(private readonly store: Store) {}

  valueChanged(value: number | boolean, fieldName: keyof NumericalConfig) {
    if (this.numericalConfig && this.fieldName) {
      this.store.dispatch(
        changedNumericalConfig({
          config: {...this.numericalConfig, [fieldName]: value},
          displayConfigField: this.fieldName,
        })
      );
    }
  }
}
