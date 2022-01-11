import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {GaugeConfig, NeedleConfig, NumericalConfig, TableConfig} from '../../config/models/configs';
import {
  selectGaugeConfigs,
  selectGeneralFieldsConfig,
  selectNeedleConfigs,
  selectNumericalConfigs,
  selectTableConfigs,
} from '../../config/state/config.selectors';
import {
  ConfigStateFieldsType,
  ConfigStateGaugeFieldsObject,
  ConfigStateGeneralFieldsConfig,
  ConfigStateNeedleFieldsObject,
  ConfigStateNumericalFieldsObject,
  ConfigStateTableFieldsObject,
  ConfigStateTableFieldsType,
} from '../../config/state/config.state';
import {PartialImageStateFieldsObject} from '../../image-manager/state/images.state';
import {
  selectAllImages,
  selectHighlight,
  selectSimulationProgress,
} from '../state/preview.selectors';

// Status bar constants.
const STATUS_BAR_HEIGHT = 41;
const STATUS_BAR_FONT = '28px Arial';

export class Compositor {
  subscription = new Subscription();
  images?: PartialImageStateFieldsObject<HTMLImageElement>;
  needleConfigs?: ConfigStateNeedleFieldsObject<NeedleConfig>;
  gaugeConfigs?: ConfigStateGaugeFieldsObject<GaugeConfig>;
  tableConfigs?: ConfigStateTableFieldsObject<TableConfig>;
  numericalConfigs?: ConfigStateNumericalFieldsObject<NumericalConfig>;
  generalConfig?: ConfigStateGeneralFieldsConfig;
  highlight?: ConfigStateFieldsType;
  simulationProgress?: number;

  // Child prams really, but they need to be here due to JS being shit.
  currentTable: ConfigStateTableFieldsType = 'table1';
  needleRanges = {
    0: [0, 0],
    1: [0, 0],
    2: [0, 0],
  };

  /** To be implemented in the child. */
  drawBackground() {}
  drawForeground() {}
  drawHighlights() {}
  gaugeConfigsChanged() {}
  tableConfigsChanged() {}

  constructor(public context: CanvasRenderingContext2D, private readonly store: Store) {
    this.subscription.add(
      this.store.select(selectAllImages).subscribe(images => {
        this.images = images;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectNeedleConfigs).subscribe(configs => {
        this.needleConfigs = configs;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectGaugeConfigs).subscribe(configs => {
        this.gaugeConfigs = configs;
        this.gaugeConfigsChanged();
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectNumericalConfigs).subscribe(configs => {
        this.numericalConfigs = configs;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectTableConfigs).subscribe(configs => {
        this.tableConfigs = configs;
        this.tableConfigsChanged();
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectGeneralFieldsConfig).subscribe(config => {
        this.generalConfig = config;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectHighlight).subscribe(highlight => {
        this.highlight = highlight;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectSimulationProgress).subscribe(progress => {
        this.simulationProgress = progress;
        this.redrawAll();
      })
    );
  }

  redrawAll() {
    if (
      !this ||
      !this.images ||
      !this.gaugeConfigs ||
      !this.needleConfigs ||
      !this.numericalConfigs ||
      !this.generalConfig
    )
      return;

    // Draw everything.
    this.drawBackground();
    this.drawForeground();
    this.drawHighlights();
  }

  drawImage(image: HTMLImageElement, x: number, y: number) {
    this.context.drawImage(image, x, y);
  }

  drawStatusBar(highlight: boolean) {
    const statusBarY = 480 - STATUS_BAR_HEIGHT;
    this.context.font = STATUS_BAR_FONT;
    this.context.fillStyle = '#333333';
    this.context.fillRect(0, statusBarY, 800, STATUS_BAR_HEIGHT);
    this.context.fillStyle = '#666666';
    this.context.fillRect(0, statusBarY, 800, 4);
    this.context.fillStyle = '#999999';
    this.context.fillRect(0, statusBarY, 800, 3);
    this.context.fillStyle = '#ffffff';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    const date = new Date();
    this.context.fillText(
      `${date.toTimeString().substr(0, 5)}`,
      399,
      statusBarY + STATUS_BAR_HEIGHT / 2 + 1
    );
    this.context.globalAlpha = 1;
  }

  drawStatusBarHighlight() {
    this.context.lineWidth = 1;
    this.context.globalAlpha = 0.7;
    this.context.strokeStyle = 'yellow';
    this.context.strokeRect(0.5, 479.5 - STATUS_BAR_HEIGHT, 799, STATUS_BAR_HEIGHT);
    this.context.globalAlpha = 1;
  }

  destroy() {
    this.subscription.unsubscribe();
  }
}
