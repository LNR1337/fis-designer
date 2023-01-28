import {ConfigStateTableFields, ConfigStateTableFieldsType} from '../../config/state/config.state';
import {SIMULATION_DISABLED} from '../state/preview.state';
import {Compositor} from './common.compositor';

// Table view constants.
const RS3_TABLE_LEFT = [139, 85, 49, 26, 17, 23, 31, 43, 57, 74];
const RS3_TABLE_RIGHT = [530, 505, 488, 477, 471, 471, 471, 475, 484, 499];
const TTRS_TABLE_LEFT = [115, 45, 15, 20, 25, 35, 45, 60, 75, 95];
const TTRS_TABLE_RIGHT = [519, 489, 469, 459, 459, 459, 459, 459, 469, 479];
const TABLE_LEFT = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
const TABLE_RIGHT = [799, 799, 799, 799, 799, 799, 799, 799, 799, 799];
const RS_UNIT_OFFSET = 80;
const RS_VALUE_OFFSET = 95;
const UNIT_OFFSET = 170;
const VALUE_OFFSET = 190; // Justify to the right.
const TABLE_FONT = '28px Verdana';
const LINE1_Y = 20;
const LINE_HEIGHT = 40;

export class TablesCompositor extends Compositor {
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
    }
  }

  generateValue(min: number, max: number): number {
    if (this.simulationProgress === undefined || this.simulationProgress === SIMULATION_DISABLED) {
      if (min !== 0 || max !== 0) {
        return min;
      }
      return 123.456;
    }
    const lowerBound = min !== 0 ? min - 0.2 * min : -100;
    const upperBound = max !== 0 ? max + 0.2 * max : 100;
    return (this.simulationProgress * (upperBound - lowerBound)) / 100 + lowerBound;
  }

  drawLabels() {
    if (!this.tableConfigs || !this.tableConfigs[this.currentTable]) return;

    this.context.globalAlpha = 1;
    this.context.font = TABLE_FONT;
    this.context.fillStyle = `${this.generalConfig?.tableFontColor}`;
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';
    let unitOffset = UNIT_OFFSET;
    let valueOffset = VALUE_OFFSET;
    let leftBound = TABLE_LEFT;
    let rightBound = TABLE_RIGHT;
    if (this.generalConfig?.virtualCockpitFriendlyTables && this.generalConfig?.car === 14) {
      // Audi TT (RS).
      leftBound = TTRS_TABLE_LEFT;
      rightBound = TTRS_TABLE_RIGHT;
      unitOffset = RS_UNIT_OFFSET;
      valueOffset = RS_VALUE_OFFSET;
    } else if (this.generalConfig?.virtualCockpitFriendlyTables && this.generalConfig?.car === 9) {
      // Audi A3 (RS3).
      leftBound = RS3_TABLE_LEFT;
      rightBound = RS3_TABLE_RIGHT;
      unitOffset = RS_UNIT_OFFSET;
      valueOffset = RS_VALUE_OFFSET;
    }
    for (let i = 0; i < 10; i++) {
      const row = this.tableConfigs[this.currentTable].rows[i];
      const unit = row.unit === '*lambda*' ? 'λ' : row.unit;
      // Label.
      this.context.fillStyle = `${this.generalConfig?.tableFontColor}`;
      this.context.textAlign = 'start';
      this.context.fillText(row.label, leftBound[i], LINE1_Y + i * LINE_HEIGHT);
      // Unit.
      this.context.textAlign = 'start';
      this.context.fillText(unit, rightBound[i] - unitOffset, LINE1_Y + i * LINE_HEIGHT);
      // Value.
      if (row.measurementId) {
        this.context.fillStyle = `${this.generalConfig?.tableFontColor}`;
        this.context.textAlign = 'end';
        const value = this.generateValue(row.lowerWarning, row.upperWarning);
        if (row.lowerWarning !== 0 && row.upperWarning !== 0) {
          // Warnings enabled.
          if (value < row.lowerWarning || value > row.upperWarning) {
            this.context.fillStyle = '#ff0000';
          }
        }
        this.context.fillText(
          `${value.toFixed(3)}`,
          rightBound[i] - valueOffset,
          LINE1_Y + i * LINE_HEIGHT
        );
      }
    }
  }

  override drawBackground() {
    this.context.globalAlpha = 1;
    this.context.fillStyle = `${this.generalConfig?.tableBackgroundColor}`;
    this.context.fillRect(0, 0, 800, 480);
    if (this.generalConfig?.useTableBackgroundImage && this.images?.tableBackgroundImage) {
      for (let x = 0; x < 800; x += 96) {
        for (let y = 0; y < 480; y += 96) {
          this.drawImage(this.images.tableBackgroundImage, x, y);
        }
      }
    }
  }

  override drawForeground() {
    // Set active table based on highlight.

    if (
      this.highlight &&
      ConfigStateTableFields.includes(this.highlight as ConfigStateTableFieldsType)
    ) {
      this.currentTable = this.highlight as ConfigStateTableFieldsType;
    }

    // Draw labels.
    this.drawLabels();

    // Draw the status bar.
    if (!this.generalConfig?.hideStatusBarOnTable) {
      this.drawStatusBar(!!this.highlight);
    }
  }
}
