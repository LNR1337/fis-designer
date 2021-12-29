import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {SETUP_FIELDS_METADATA} from '../models/configs_metadata';
import {changedDisplaySetupConfig, changedNumericalConfig} from '../state/display.actions';
import {
  DisplayStateSetupFieldsColor,
  DisplayStateSetupFieldsConfig,
  DisplayStateSetupFieldsNumerical,
  DisplayStateSetupFieldsType,
} from '../state/display.state';

@Component({
  selector: 'app-numerical-setup',
  templateUrl: './numerical-setup.component.html',
  styleUrls: ['./numerical-setup.component.scss'],
})
export class NumericalSetupComponent {
  @Input() setupConfig?: DisplayStateSetupFieldsConfig;
  @Input() label = '';

  SETUP_FIELDS_METADATA = SETUP_FIELDS_METADATA;
  numericalFields = DisplayStateSetupFieldsNumerical;
  colorFields = DisplayStateSetupFieldsColor;

  constructor(private readonly store: Store) {}

  valueChanged(value: number | string, fieldName: DisplayStateSetupFieldsType) {
    if (!this.setupConfig) return;
    this.store.dispatch(
      changedDisplaySetupConfig({
        config: {...this.setupConfig, [fieldName]: value},
      })
    );
  }

  getNumericalValue(fieldName: DisplayStateSetupFieldsType): number {
    if (!(this.numericalFields as ReadonlyArray<string>).includes(fieldName)) {
      throw new Error('Getting numerical value of non-numerical field.');
    }
    if (!this.setupConfig) return 0;
    return this.setupConfig[fieldName] as number;
  }

  getStringValue(fieldName: DisplayStateSetupFieldsType): string {
    if (!(this.colorFields as ReadonlyArray<string>).includes(fieldName)) {
      throw new Error('Getting string value of non-string field.');
    }
    if (!this.setupConfig) return '';
    return this.setupConfig[fieldName] as string;
  }
}
