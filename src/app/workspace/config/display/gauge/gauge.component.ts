import {Component, Input} from '@angular/core';
import {
  StateDisplayGaugeFieldsType
} from "../state/display.state";
import {StateImageFieldsType} from "../../../preview/state/preview.state";
import {Store} from "@ngrx/store";
import {changedGaugeConfig} from "../state/display.actions";
import {GaugeConfig} from "../models/configs";
import {GAUGE_FIELD_LABELS} from '../models/configs_metadata';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent {
  // Configuration for this gauge.
  @Input() gaugeConfig?: GaugeConfig;
  // Name of the state field this config corresponds to.
  @Input() fieldName?: StateDisplayGaugeFieldsType;
  // List of names of loaded images.
  @Input() loadedImages?: Set<StateImageFieldsType>;
  @Input() label = '';

  GAUGE_FIELD_LABELS = GAUGE_FIELD_LABELS;

  constructor(private readonly store: Store) {
  }

  valueChanged(value: number, fieldName: keyof GaugeConfig) {
    if (this.gaugeConfig && this.fieldName) {
      this.store.dispatch(changedGaugeConfig({
        config: {...this.gaugeConfig, [fieldName]: value},
        displayConfigField: this.fieldName
      }));
    }
  }

}
