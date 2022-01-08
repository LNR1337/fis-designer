import {Component, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {ImageStateFieldsType} from '../../../image-manager/state/images.state';
import {containsAllDigitImages} from '../../../image-manager/utils';
import {STATE_FIELDS_METADATA} from '../../models/configs_metadata';
import {changedGeneralFieldsConfig, recalculateDigitsSize} from '../../state/config.actions';
import {
  ConfigStateFieldsBooleanSet,
  ConfigStateFieldsStringSet,
  ConfigStateFieldsNumericalSelectSet,
  ConfigStateFieldsNumericalSet,
  ConfigStateGeneralFieldsConfig,
  ConfigStateGeneralFieldsType,
} from '../../state/config.state';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralComponent implements OnChanges {
  // List of names of loaded images.
  @Input() loadedImages?: Set<ImageStateFieldsType>;
  @Input() generalConfig?: ConfigStateGeneralFieldsConfig;
  @Input() showFields: ReadonlyArray<ConfigStateGeneralFieldsType> = [];
  @Input() label = '';
  @Input() rightLabel = false;

  STATE_FIELDS_METADATA = STATE_FIELDS_METADATA;
  numericalFields = ConfigStateFieldsNumericalSet;
  colorFields = ConfigStateFieldsStringSet;
  booleanFields = ConfigStateFieldsBooleanSet;
  selectFields = ConfigStateFieldsNumericalSelectSet;
  resizeEnabled = false;

  constructor(private readonly store: Store) {}

  valueChanged(value: number | string | boolean, fieldName: ConfigStateGeneralFieldsType) {
    if (!this.generalConfig) return;
    this.store.dispatch(
      changedGeneralFieldsConfig({
        config: {...this.generalConfig, [fieldName]: value},
      })
    );
  }

  getNumericalValue(fieldName: ConfigStateGeneralFieldsType): number {
    if (!this.generalConfig) return 0;
    return this.generalConfig[fieldName] as number;
  }

  getStringValue(fieldName: ConfigStateGeneralFieldsType): string {
    if (!this.generalConfig) return '';
    return this.generalConfig[fieldName] as string;
  }

  getBooleanValue(fieldName: ConfigStateGeneralFieldsType): boolean {
    if (!this.generalConfig) return false;
    return this.generalConfig[fieldName] as boolean;
  }

  recalculateSize() {
    if (this.generalConfig) {
      this.store.dispatch(recalculateDigitsSize());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loadedImages'] && this.generalConfig && this.loadedImages) {
      this.resizeEnabled = containsAllDigitImages(this.loadedImages);
    }
  }
}
