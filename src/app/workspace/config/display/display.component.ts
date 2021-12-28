import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {ImageStateFieldsType} from '../../image-manager/state/images.state';
import {selectLoadedImageNames} from '../../preview/state/preview.selectors';
import {
  DisplayStateNeedleFieldsObject,
  DisplayStateGaugeFieldsObject,
  DisplayStateGaugeFields,
  DisplayStateNeedleFields,
  DisplayStateNumericalFields,
  DisplayStateFieldsType,
  DisplayStateNumericalFieldsObject,
} from './state/display.state';
import {
  selectNeedleConfigs,
  selectGaugeConfigs,
  selectNumericalConfigs,
} from './state/display.selectors';
import {GaugeConfig, NeedleConfig, NumericalConfig} from './models/configs';
import {GAUGE_LABELS, NEEDLE_LABELS, NUMERICAL_LABELS} from './models/configs_metadata';
import {disableHighlight, enableHighlight} from './state/display.actions';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent {
  loadedImages: Observable<Set<ImageStateFieldsType>>;
  needlesConfigs: Observable<DisplayStateNeedleFieldsObject<NeedleConfig>>;
  gaugesConfigs: Observable<DisplayStateGaugeFieldsObject<GaugeConfig>>;
  numericalConfigs: Observable<DisplayStateNumericalFieldsObject<NumericalConfig>>;

  GAUGE_LABELS = GAUGE_LABELS;
  NEEDLE_LABELS = NEEDLE_LABELS;
  NUMERICAL_LABELS = NUMERICAL_LABELS;
  DisplayStateGaugeFields = DisplayStateGaugeFields;
  DisplayStateNeedleFields = DisplayStateNeedleFields;
  DisplayStateNumericalFields = DisplayStateNumericalFields;

  constructor(private readonly store: Store) {
    this.loadedImages = store
      .select(selectLoadedImageNames)
      .pipe(map(imageList => new Set(imageList)));
    this.needlesConfigs = store.select(selectNeedleConfigs);
    this.gaugesConfigs = store.select(selectGaugeConfigs);
    this.numericalConfigs = store.select(selectNumericalConfigs);
  }

  highlight(stateField: DisplayStateFieldsType) {
    this.store.dispatch(enableHighlight({stateField}));
  }

  highlightNone() {
    this.store.dispatch(disableHighlight());
  }
}
