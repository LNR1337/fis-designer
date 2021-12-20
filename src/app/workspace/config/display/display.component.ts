import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {PreviewStateImageFieldsType} from "../../preview/state/preview.state";
import {map, Observable} from "rxjs";
import {selectLoadedImageNames} from "../../preview/state/preview.selectors";
import {
  DisplayStateNeedleFieldsObject,
  DisplayStateGaugeFieldsObject,
  DisplayStateGaugeFields,
  DisplayStateNeedleFields,
  DisplayStateFieldsType,
} from "./state/display.state";
import {selectNeedleConfigs, selectGaugeConfigs} from "./state/display.selectors";
import {
  GaugeConfig,
  NeedleConfig,
} from "./models/configs";
import {GAUGE_LABELS, NEEDLE_LABELS} from './models/configs_metadata';
import {disableHighlight, enableHighlight} from "./state/display.actions";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  loadedImages: Observable<Set<PreviewStateImageFieldsType>>;
  needlesConfigs: Observable<DisplayStateNeedleFieldsObject<NeedleConfig>>;
  gaugesConfigs: Observable<DisplayStateGaugeFieldsObject<GaugeConfig>>;

  GAUGE_LABELS = GAUGE_LABELS;
  NEEDLE_LABELS = NEEDLE_LABELS;
  DisplayStateGaugeFields = DisplayStateGaugeFields;
  DisplayStateNeedleFields = DisplayStateNeedleFields;

  constructor(private readonly store: Store) {
    this.loadedImages =
      store.select(selectLoadedImageNames).pipe(map(imageList => new Set(imageList)));
    this.needlesConfigs = store.select(selectNeedleConfigs);
    this.gaugesConfigs = store.select(selectGaugeConfigs);
  }

  highlight(stateField: DisplayStateFieldsType) {
    this.store.dispatch(enableHighlight({stateField}));
  }

  highlightNone() {
    this.store.dispatch(disableHighlight());
  }
}
