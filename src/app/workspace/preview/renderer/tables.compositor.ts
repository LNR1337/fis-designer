import {ConfigStateTableFieldsType} from '../../config/state/config.state';
import {Compositor} from './common.compositor';

// Table view constants.
const RS3_TABLE_LEFT = [139, 85, 49, 26, 17, 23, 31, 43, 57, 74];
const RS3_TABLE_RIGHT = [530, 505, 488, 477, 471, 471, 471, 475, 484, 499];
const TTRS_TABLE_LEFT = [115, 45, 15, 20, 25, 35, 45, 60, 75, 95];
const TTRS_TABLE_RIGHT = [519, 489, 469, 459, 459, 459, 459, 459, 469, 479];
const RS_UNIT_OFFSET = -80;
const RS_VALUE_OFFSET = -300;
const LABEL_X = 16;
const TABLE_FONT = '30px Arial';
const UNIT_X = 632;
const VALUE_X = 610; // Justify to the right.
const LINE1_Y = 41;
const LINE_HEIGHT = 42;

export class TablesCompositor extends Compositor {
  currentTable: ConfigStateTableFieldsType = 'table1';

  override drawHighlights() {
    if (
      !this.needleConfigs ||
      !this.gaugeConfigs ||
      !this.numericalConfigs ||
      !this.generalConfig
    ) {
      return;
    }

    // TODO(pawelszydlo): streamline this.
    switch (this.highlight) {
      case 'hideStatusBarOnTable':
        this.drawStatusBarHighlight();
        break;
      case 'table1':
      case 'table2':
      case 'table3':
      case 'table4':
      case 'table5':
        this.currentTable = this.highlight;
        break;
    }
  }

  generateValue(min: number, max: number): number {
    const lowerBound = min !== 0 ? min - 0.2 * min : -100;
    const upperBound = max !== 0 ? max + 0.2 * max : 100;
    return Math.random() * (upperBound - lowerBound + 1) + lowerBound;
  }

  drawLabels() {
    if (!this.tableConfigs || !this.tableConfigs[this.currentTable]) return;

    this.context.globalAlpha = 1;
    this.context.font = TABLE_FONT;
    this.context.fillStyle = `${this.generalConfig?.tableFontColor}`;
    this.context.textAlign = 'start';
    this.context.textBaseline = 'bottom';
    for (let i = 0; i < 10; i++) {
      const row = this.tableConfigs[this.currentTable].rows[i];
      const unit = row.unit === '*lambda*' ? 'λ' : row.unit;
      // Label.
      this.context.fillStyle = `${this.generalConfig?.tableFontColor}`;
      this.context.textAlign = 'start';
      this.context.fillText(row.label, LABEL_X, LINE1_Y + i * LINE_HEIGHT);
      // Unit.
      this.context.textAlign = 'start';
      this.context.fillText(unit, UNIT_X, LINE1_Y + i * LINE_HEIGHT);
      // Value.
      if (row.measurementId) {
        this.context.fillStyle = `${this.generalConfig?.tableFontColor}`;
        this.context.textAlign = 'end';
        const value = this.generateValue(row.lowerWarning, row.upperWarning);
        if (
          (row.lowerWarning !== 0 && value < row.lowerWarning) ||
          (row.upperWarning !== 0 && value > row.upperWarning)
        ) {
          this.context.fillStyle = `${this.generalConfig?.fontWarningColor}`;
        }
        this.context.fillText(`${value.toFixed(3)}`, VALUE_X, LINE1_Y + i * LINE_HEIGHT);
      }
    }
  }

  override drawBackground() {
    this.context.globalAlpha = 1;
    this.context.fillStyle = `${this.generalConfig?.tableBackgroundColor}`;
    this.context.fillRect(0, 0, 800, 480);
  }

  override drawForeground() {
    // Draw labels.
    this.drawLabels();

    // Draw the status bar.
    if (!this.generalConfig?.hideStatusBarOnTable) {
      this.drawStatusBar(!!this.highlight);
    }
  }
}
