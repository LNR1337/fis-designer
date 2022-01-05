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
  ConfigStateGeneralFieldsConfig,
  ConfigStateGeneralGaugesFields,
  ConfigStateGeneralNumericalFields,
  ConfigStateGeneralTableFields,
  ConfigStateGeneralMiscFields,
  ConfigStateTableFieldsObject,
  ConfigStateTableFields,
} from '../state/config.state';
import {
  selectNeedleConfigs,
  selectGaugeConfigs,
  selectNumericalConfigs,
  selectGeneralFieldsConfig,
  selectTableFields,
} from '../state/config.selectors';
import {GaugeConfig, NeedleConfig, NumericalConfig, TableConfig} from '../models/configs';
import {STATE_FIELDS_METADATA} from '../models/configs_metadata';
import {disableHighlight, enableHighlight} from '../state/config.actions';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent {
  @Input() page: 'gauges' | 'numerical' | 'tables' | 'misc' = 'gauges';

  loadedImages: Observable<Set<ImageStateFieldsType>>;
  needlesConfigs: Observable<ConfigStateNeedleFieldsObject<NeedleConfig>>;
  gaugesConfigs: Observable<ConfigStateGaugeFieldsObject<GaugeConfig>>;
  tableConfigs: Observable<ConfigStateTableFieldsObject<TableConfig>>;
  numericalConfigs: Observable<ConfigStateNumericalFieldsObject<NumericalConfig>>;
  generalConfig: Observable<ConfigStateGeneralFieldsConfig>;

  STATE_FIELDS_METADATA = STATE_FIELDS_METADATA;

  ConfigStateGaugeFields = ConfigStateGaugeFields;
  ConfigStateNeedleFields = ConfigStateNeedleFields;
  ConfigStateNumericalFields = ConfigStateNumericalFields;
  ConfigStateTableFields = ConfigStateTableFields;
  ConfigStateGeneralGaugesFields = ConfigStateGeneralGaugesFields;
  ConfigStateGeneralNumericalFields = ConfigStateGeneralNumericalFields;
  ConfigStateGeneralTableFields = ConfigStateGeneralTableFields;
  ConfigStateGeneralMiscFields = ConfigStateGeneralMiscFields;

  constructor(private readonly store: Store) {
    this.loadedImages = store
      .select(selectLoadedImageNames)
      .pipe(map(imageList => new Set(imageList)));
    this.needlesConfigs = store.select(selectNeedleConfigs);
    this.gaugesConfigs = store.select(selectGaugeConfigs);
    this.numericalConfigs = store.select(selectNumericalConfigs);
    this.generalConfig = store.select(selectGeneralFieldsConfig);
    this.tableConfigs = store.select(selectTableFields);
  }

  highlight(stateField: ConfigStateFieldsType) {
    this.store.dispatch(enableHighlight({stateField}));
  }

  highlightNone() {
    this.store.dispatch(disableHighlight());
  }
}
