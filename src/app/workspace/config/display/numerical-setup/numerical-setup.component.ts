import {Component, Input, SimpleChanges} from '@angular/core';
import {Store} from '@ngrx/store';
import {ImageStateFieldsType} from '../../../image-manager/state/images.state';
import {containsAllDigitImages} from '../../../image-manager/utils';
import {SETUP_FIELDS_METADATA} from '../../models/configs_metadata';
import {changedDisplaySetupConfig, recalculateDigitsSize} from '../../state/config.actions';
import {
  ConfigStateFieldsColorSet,
  ConfigStateDigitSetupFieldsConfig,
  ConfigStateFieldsNumericalSet,
  ConfigStateDigitSetupFieldsType,
  ConfigStateDigitSetupFields,
} from '../../state/config.state';

@Component({
  selector: 'app-numerical-setup',
  templateUrl: './numerical-setup.component.html',
  styleUrls: ['./numerical-setup.component.scss'],
})
export class NumericalSetupComponent {
  // List of names of loaded images.
  @Input() loadedImages?: Set<ImageStateFieldsType>;
  @Input() setupConfig?: ConfigStateDigitSetupFieldsConfig;
  @Input() label = '';

  SETUP_FIELDS_METADATA = SETUP_FIELDS_METADATA;
  allFields = ConfigStateDigitSetupFields;
  numericalFields = ConfigStateFieldsNumericalSet;
  colorFields = ConfigStateFieldsColorSet;
  resizeEnabled = false;

  constructor(private readonly store: Store) {}

  recalculateSize() {
    if (this.setupConfig) {
      this.store.dispatch(recalculateDigitsSize());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loadedImages'] && this.setupConfig && this.loadedImages) {
      this.resizeEnabled = containsAllDigitImages(this.loadedImages);
    }
  }

  valueChanged(value: number | string | boolean, fieldName: ConfigStateDigitSetupFieldsType) {
    if (!this.setupConfig) return;
    this.store.dispatch(
      changedDisplaySetupConfig({
        config: {...this.setupConfig, [fieldName]: value},
      })
    );
  }

  getNumericalValue(fieldName: ConfigStateDigitSetupFieldsType): number {
    if (!this.setupConfig) return 0;
    return this.setupConfig[fieldName] as number;
  }

  getStringValue(fieldName: ConfigStateDigitSetupFieldsType): string {
    if (!this.setupConfig) return '';
    return this.setupConfig[fieldName] as string;
  }

  getBooleanValue(fieldName: ConfigStateDigitSetupFieldsType): boolean {
    if (!this.setupConfig) return false;
    return this.setupConfig[fieldName] as boolean;
  }
}
