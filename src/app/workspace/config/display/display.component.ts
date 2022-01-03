import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {ImageStateFieldsType} from '../../image-manager/state/images.state';
import {selectLoadedImageNames} from '../../preview/state/preview.selectors';
import {
  ConfigStateNeedleFieldsObject,
  ConfigStateGaugeFieldsObject,
  ConfigStateGaugeFields,
  ConfigStateNeedleFields,
  ConfigStateNumericalFields,
  ConfigStateFieldsType,
  ConfigStateNumericalFieldsObject,
  ConfigStateSetupFieldsConfig,
} from '../state/config.state';
import {
  selectNeedleConfigs,
  selectGaugeConfigs,
  selectNumericalConfigs,
  selectDisplaySetupValues,
} from '../state/config.selectors';
import {GaugeConfig, NeedleConfig, NumericalConfig} from '../models/configs';
import {GAUGE_LABELS, NEEDLE_LABELS, NUMERICAL_LABELS} from '../models/configs_metadata';
import {disableHighlight, enableHighlight} from '../state/config.actions';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent {
  @Input() page: 'gauges' | 'numerical' = 'gauges';

  loadedImages: Observable<Set<ImageStateFieldsType>>;
  needlesConfigs: Observable<ConfigStateNeedleFieldsObject<NeedleConfig>>;
  gaugesConfigs: Observable<ConfigStateGaugeFieldsObject<GaugeConfig>>;
  numericalConfigs: Observable<ConfigStateNumericalFieldsObject<NumericalConfig>>;
  setupConfig: Observable<ConfigStateSetupFieldsConfig>;

  GAUGE_LABELS = GAUGE_LABELS;
  NEEDLE_LABELS = NEEDLE_LABELS;
  NUMERICAL_LABELS = NUMERICAL_LABELS;
  ConfigStateGaugeFields = ConfigStateGaugeFields;
  ConfigStateNeedleFields = ConfigStateNeedleFields;
  ConfigStateNumericalFields = ConfigStateNumericalFields;

  constructor(private readonly store: Store) {
    this.loadedImages = store
      .select(selectLoadedImageNames)
      .pipe(map(imageList => new Set(imageList)));
    this.needlesConfigs = store.select(selectNeedleConfigs);
    this.gaugesConfigs = store.select(selectGaugeConfigs);
    this.numericalConfigs = store.select(selectNumericalConfigs);
    this.setupConfig = store.select(selectDisplaySetupValues);
  }

  highlight(stateField: ConfigStateFieldsType) {
    this.store.dispatch(enableHighlight({stateField}));
  }

  highlightNone() {
    this.store.dispatch(disableHighlight());
  }
}
