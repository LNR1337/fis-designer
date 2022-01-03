import {Component, Input} from '@angular/core';
import {ImageStateFieldsType} from '../../../image-manager/state/images.state';
import {ConfigStateGaugeFieldsType} from '../../state/config.state';
import {Store} from '@ngrx/store';
import {changedGaugeConfig} from '../../state/config.actions';
import {GaugeConfig, GaugeConfigFields} from '../../models/configs';
import {GAUGE_FIELD_METADATA} from '../../models/configs_metadata';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent {
  // Configuration for this gauge.
  @Input() gaugeConfig?: GaugeConfig;
  // Name of the state field this config corresponds to.
  @Input() fieldName?: ConfigStateGaugeFieldsType;
  // List of names of loaded images.
  @Input() loadedImages?: Set<ImageStateFieldsType>;
  @Input() label = '';

  GAUGE_FIELD_METADATA = GAUGE_FIELD_METADATA;
  GaugeConfigFields = GaugeConfigFields;

  constructor(private readonly store: Store) {}

  valueChanged(value: number, fieldName: keyof GaugeConfig) {
    if (this.gaugeConfig && this.fieldName) {
      this.store.dispatch(
        changedGaugeConfig({
          config: {...this.gaugeConfig, [fieldName]: value},
          displayConfigField: this.fieldName,
        })
      );
    }
  }
}
