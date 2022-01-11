import {
  GaugeConfig,
  getAbsoluteNeedleAngleBounds,
  NeedleConfig,
  NumericalConfig,
} from '../../config/models/configs';
import {ConfigStateGeneralFieldsConfig} from '../../config/state/config.state';
import {SIMULATION_DISABLED} from '../state/preview.state';

import {Compositor} from './common.compositor';

// Guides constants.
const GUIDES_FONT = '10px sans-serif';
const CROSS_SIZE = 10;
const INDICATOR_SIZE = 7;
const NUMERICAL_DIGITS = 3;
// Digital gauges constants.
const GTI_FONT_WIDTH = 28;
const GTI_FONT_HEIGHT = 24;

function getTranslatedAngles(angleBounds: [number, number]) {
  let minAngle = angleBounds[0];
  let maxAngle = angleBounds[1];
  // Needle images are vertical, pointing up, so their initial angle is PI/2.
  minAngle = minAngle + Math.PI / 2;
  maxAngle = maxAngle + Math.PI / 2;
  // Make sure the bounds are in correct order.
  if (minAngle > maxAngle) {
    [minAngle, maxAngle] = [maxAngle, minAngle];
  }
  return [minAngle, maxAngle];
}

/** Class responsible for rendering gauges on the canvas. */
export class GaugesCompositor extends Compositor {
  recalcNeedleRanges() {
    if (!this.gaugeConfigs) return;

    this.needleRanges[0] = getTranslatedAngles(
      getAbsoluteNeedleAngleBounds(this.gaugeConfigs.gauge1)
    );
    this.needleRanges[1] = getTranslatedAngles(
      getAbsoluteNeedleAngleBounds(this.gaugeConfigs.gauge2)
    );
    this.needleRanges[2] = getTranslatedAngles(
      getAbsoluteNeedleAngleBounds(this.gaugeConfigs.gauge3)
    );
  }

  override gaugeConfigsChanged() {
    this.recalcNeedleRanges();
  }

  override tableConfigsChanged() {
    this.recalcNeedleRanges();
  }

  getNeedleAngle(needleId: 0 | 1 | 2): number {
    if (this.simulationProgress === undefined || this.simulationProgress === SIMULATION_DISABLED) {
      return 0;
    }

    return (
      (this.simulationProgress *
        (this.needleRanges[needleId][1] - this.needleRanges[needleId][0])) /
        100 +
      this.needleRanges[needleId][0]
    );
  }

  drawNeedles() {
    if (
      !this.images ||
      !this.gaugeConfigs ||
      !this.needleConfigs ||
      !this.simulationProgress ||
      !this.tableConfigs
    )
      return;

    if (this.images.needleImage1) {
      const config = this.needleConfigs.needle1;
      this.drawImageRotatedAround(
        this.images.needleImage1,
        config.positionX!,
        config.positionY!,
        config.positionX! + config.centerX!,
        config.positionY! + config.centerY!,
        this.getNeedleAngle(0)
      );
    }
    if (this.images.needleImage2) {
      const config = this.needleConfigs.needle2;
      this.drawImageRotatedAround(
        this.images.needleImage2,
        config.positionX!,
        config.positionY!,
        config.positionX! + config.centerX!,
        config.positionY! + config.centerY!,
        this.getNeedleAngle(1)
      );
    }
    if (this.images.needleImage3) {
      const config = this.needleConfigs.needle3;
      this.drawImageRotatedAround(
        this.images.needleImage3,
        config.positionX!,
        config.positionY!,
        config.positionX! + config.centerX!,
        config.positionY! + config.centerY!,
        this.getNeedleAngle(2)
      );
    }
  }

  override drawBackground() {
    this.context.clearRect(0, 0, 800, 480);
    if (this.images?.backgroundImage) {
      if (this.highlight) {
        this.context.globalAlpha = 0.5;
      } else {
        this.context.globalAlpha = 1;
      }
      this.drawImage(this.images.backgroundImage, 0, 0);
      this.context.globalAlpha = 1;
    }
  }

  override drawForeground() {
    // Draw the needles.
    this.drawNeedles();

    // Draw the status bar.
    if (!this.generalConfig?.hideStatusBarOnGauge) {
      this.drawStatusBar(!!this.highlight);
    }
  }

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
      case 'hideStatusBarOnGauge':
        this.drawStatusBarHighlight();
        break;
      case 'needle1':
        this.drawNeedleHighlight(this.needleConfigs.needle1);
        break;
      case 'needle2':
        this.drawNeedleHighlight(this.needleConfigs.needle2);
        break;
      case 'needle3':
        this.drawNeedleHighlight(this.needleConfigs.needle3);
        break;
      case 'gauge1':
        this.drawGaugeHighlight(this.gaugeConfigs.gauge1, this.needleConfigs.needle1);
        break;
      case 'gauge2':
        this.drawGaugeHighlight(this.gaugeConfigs.gauge2, this.needleConfigs.needle2);
        break;
      case 'gauge3':
        this.drawGaugeHighlight(this.gaugeConfigs.gauge3, this.needleConfigs.needle3);
        break;
      case 'numerical1':
        this.drawNumericalHighlight(this.numericalConfigs.numerical1, this.generalConfig);
        break;
      case 'numerical2':
        this.drawNumericalHighlight(this.numericalConfigs.numerical2, this.generalConfig);
        break;
      case 'numerical3':
        this.drawNumericalHighlight(this.numericalConfigs.numerical3, this.generalConfig);
        break;
      case 'numerical4':
        this.drawNumericalHighlight(this.numericalConfigs.numerical4, this.generalConfig);
        break;
      case 'numerical5':
        this.drawNumericalHighlight(this.numericalConfigs.numerical5, this.generalConfig);
        break;
      case 'numerical6':
        this.drawNumericalHighlight(this.numericalConfigs.numerical6, this.generalConfig);
        break;
      case 'numerical7':
        this.drawNumericalHighlight(this.numericalConfigs.numerical7, this.generalConfig);
        break;
      case 'numerical8':
        this.drawNumericalHighlight(this.numericalConfigs.numerical8, this.generalConfig);
        break;
      case 'numerical9':
        this.drawNumericalHighlight(this.numericalConfigs.numerical9, this.generalConfig);
        break;
      case 'numerical10':
        this.drawNumericalHighlight(this.numericalConfigs.numerical10, this.generalConfig);
        break;
      case 'fontWidth': // Placeholder for all digital gauges setup.
        this.drawGTIHighlight(
          this.generalConfig,
          this.needleConfigs.needle1,
          this.needleConfigs.needle2,
          this.needleConfigs.needle3
        );
        this.drawNumericalHighlight(this.numericalConfigs.numerical1, this.generalConfig, false);
        this.drawNumericalHighlight(this.numericalConfigs.numerical2, this.generalConfig, false);
        this.drawNumericalHighlight(this.numericalConfigs.numerical3, this.generalConfig, false);
        this.drawNumericalHighlight(this.numericalConfigs.numerical4, this.generalConfig, false);
        this.drawNumericalHighlight(this.numericalConfigs.numerical5, this.generalConfig, false);
        this.drawNumericalHighlight(this.numericalConfigs.numerical6, this.generalConfig, false);
        this.drawNumericalHighlight(this.numericalConfigs.numerical7, this.generalConfig, false);
        this.drawNumericalHighlight(this.numericalConfigs.numerical8, this.generalConfig, false);
        this.drawNumericalHighlight(this.numericalConfigs.numerical9, this.generalConfig, false);
        this.drawNumericalHighlight(this.numericalConfigs.numerical10, this.generalConfig, false);
        break;
    }
  }

  drawImageRotatedAround(
    image: HTMLImageElement,
    positionX: number,
    positionY: number,
    rotationX: number,
    rotationY: number,
    rotationAngle: number
  ) {
    this.context.translate(rotationX, rotationY);
    this.context.rotate(rotationAngle);
    this.context.translate(-rotationX, -rotationY);
    this.context.drawImage(image, positionX, positionY);
    // Reset transformations.
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  drawNeedleCenter(x: number, y: number, showCoords = true) {
    this.context.globalAlpha = 0.7;
    this.context.strokeStyle = 'cyan';
    this.context.fillStyle = 'cyan';
    this.context.font = GUIDES_FONT;
    // Target cross.
    this.context.beginPath();
    this.context.moveTo(x - CROSS_SIZE, y);
    this.context.lineTo(x + CROSS_SIZE, y);
    this.context.moveTo(x, y - CROSS_SIZE);
    this.context.lineTo(x, y + CROSS_SIZE);
    this.context.stroke();
    this.context.beginPath();
    this.context.ellipse(x, y, CROSS_SIZE, CROSS_SIZE, 0, 0, 2 * Math.PI);
    this.context.stroke();
    // Coordinate labels.
    if (showCoords) {
      this.context.textAlign = 'start';
      this.context.textBaseline = 'top';
      this.context.fillText(`y:${y - 0.5}`, x + CROSS_SIZE + 5, y + 2);
      this.context.textBaseline = 'bottom';
      this.context.fillText(`x:${x - 0.5}`, x + CROSS_SIZE + 5, y - 2);
    }
    this.context.globalAlpha = 1;
  }

  drawGTIHighlight(
    generalSetup: ConfigStateGeneralFieldsConfig,
    needleConfig1: NeedleConfig,
    needleConfig2: NeedleConfig,
    needleConfig3: NeedleConfig
  ) {
    if (!generalSetup.useBuiltInNumericalGauges) return;

    const totalWidth = NUMERICAL_DIGITS * GTI_FONT_WIDTH;

    for (const config of [needleConfig1, needleConfig2, needleConfig3]) {
      const needleCenterX = config.positionX! + config.centerX! + 0.5;
      const needleCenterY = config.positionY! + config.centerY! + 0.5;
      this.drawNeedleCenter(needleCenterX, needleCenterY, false);
      const x = needleCenterX - Math.floor(totalWidth / 2);
      const y = needleCenterY - Math.floor(GTI_FONT_HEIGHT / 2);
      this.context.globalAlpha = 0.7;
      this.context.strokeStyle = 'yellow';
      for (let i = 0; i < NUMERICAL_DIGITS; i++) {
        const rectX = x + i * GTI_FONT_WIDTH;
        this.context.strokeRect(rectX, y, GTI_FONT_WIDTH - 1, GTI_FONT_HEIGHT - 1);
      }
      this.context.globalAlpha = 1;
    }
  }

  drawNumericalHighlight(
    numericalConfig: NumericalConfig,
    generalSetup: ConfigStateGeneralFieldsConfig,
    drawPosition = true
  ) {
    if (!numericalConfig.positionX || !numericalConfig.positionY) return;

    if (drawPosition) {
      this.drawPosition(numericalConfig.positionX!, numericalConfig.positionY!);
    }
    // Bracket.
    this.context.globalAlpha = 0.7;
    const fontWidth = generalSetup.fontWidth as number;
    const fontHeight = generalSetup.fontHeight as number;
    const fontSpacing = generalSetup.fontSpacing as number;
    this.context.strokeStyle = 'yellow';
    const totalWidth = NUMERICAL_DIGITS * fontWidth + (NUMERICAL_DIGITS - 1) * fontSpacing;
    const x =
      numericalConfig.positionX! -
      (numericalConfig.centered ? Math.floor(totalWidth / 2) : totalWidth) +
      0.5;
    for (let i = 0; i < NUMERICAL_DIGITS; i++) {
      const rectX = x + i * (fontWidth + fontSpacing);
      this.context.strokeRect(
        rectX,
        numericalConfig.positionY! + 0.5,
        fontWidth - 1,
        fontHeight - 1
      );
    }
    this.context.globalAlpha = 1;
  }

  drawGaugeHighlight(gaugeConfig: GaugeConfig, needleConfig: NeedleConfig) {
    this.context.lineWidth = 1;
    this.context.globalAlpha = 0.7;
    const needleCenterX = needleConfig.positionX! + needleConfig.centerX! + 0.5;
    const needleCenterY = needleConfig.positionY! + needleConfig.centerY! + 0.5;

    const [angleStart, angleEnd] = getAbsoluteNeedleAngleBounds(gaugeConfig);

    // Needle center.
    this.drawNeedleCenter(needleCenterX, needleCenterY, false);
    // Start line.
    this.context.beginPath();
    this.context.strokeStyle = 'green';
    this.context.moveTo(needleCenterX, needleCenterY);
    this.context.lineTo(
      needleCenterX + 800 * Math.cos(angleStart),
      needleCenterY + 800 * Math.sin(angleStart)
    );
    this.context.stroke();
    // End line.
    this.context.beginPath();
    this.context.strokeStyle = 'red';
    this.context.moveTo(needleCenterX, needleCenterY);
    this.context.lineTo(
      needleCenterX + 800 * Math.cos(angleEnd),
      needleCenterY + 800 * Math.sin(angleEnd)
    );
    this.context.stroke();
    // Direction line.
    let ellipseStart = angleStart;
    let ellipseEnd = angleEnd;
    if (gaugeConfig.angularRange! < 0) {
      [ellipseStart, ellipseEnd] = [ellipseEnd, ellipseStart];
    }
    const ellipseRadius = Math.abs(needleCenterY - needleConfig.positionY!);
    this.context.beginPath();
    this.context.ellipse(
      needleCenterX,
      needleCenterY,
      ellipseRadius,
      ellipseRadius,
      0,
      ellipseStart,
      ellipseEnd
    );
    this.context.stroke();
    const ellipseRadius2 = Math.max(0, ellipseRadius - needleConfig.height!);
    this.context.beginPath();
    this.context.ellipse(
      needleCenterX,
      needleCenterY,
      ellipseRadius2,
      ellipseRadius2,
      0,
      ellipseStart,
      ellipseEnd
    );
    this.context.stroke();

    this.context.globalAlpha = 1;
  }

  drawPosition(x: number, y: number) {
    this.context.lineWidth = 1;
    this.context.globalAlpha = 0.7;
    this.context.font = GUIDES_FONT;
    // Lines
    this.context.strokeStyle = 'cyan';
    this.context.beginPath();
    this.context.moveTo(x + 0.5, 0.5);
    this.context.lineTo(x + 0.5, y + 0.5);
    this.context.lineTo(0.5, y + 0.5);
    this.context.stroke();
    // Coordinates.
    this.context.fillStyle = 'cyan';
    this.context.textAlign = 'start';
    this.context.textBaseline = 'bottom';
    this.context.fillText(`y:${y}`, 5, y - 5);
    this.context.textBaseline = 'top';
    this.context.textAlign = 'end';
    this.context.fillText(`x:${x}`, x - 5, 5);
    this.context.globalAlpha = 1;
  }

  drawNeedleHighlight(config: NeedleConfig) {
    this.context.lineWidth = 1;
    this.context.globalAlpha = 0.7;
    this.context.font = GUIDES_FONT;
    // Needle position.
    this.drawPosition(config.positionX!, config.positionY!);
    // Needle size.
    this.context.strokeStyle = 'yellow';
    this.context.fillStyle = 'yellow';
    this.context.strokeRect(
      config.positionX! + 0.5,
      config.positionY! + 0.5,
      config.width! - 1,
      config.height! - 1
    );
    // Needle middle strikethrough.
    const needleMiddleX = config.positionX! + Math.floor(config.width! / 2) + 0.5;
    this.context.beginPath();
    this.context.moveTo(needleMiddleX, 0);
    this.context.lineTo(needleMiddleX, config.positionY! + CROSS_SIZE + 0.5);
    this.context.moveTo(needleMiddleX, config.positionY! + config.height! - CROSS_SIZE + 0.5);
    this.context.lineTo(needleMiddleX, 479);
    this.context.stroke();
    this.context.textAlign = 'end';
    this.context.textBaseline = 'bottom';
    this.context.fillText(`x:${needleMiddleX - 0.5}`, needleMiddleX - 5, 474);
    // Needle center.
    const centerX = config.positionX! + config.centerX! + 0.5;
    const centerY = config.positionY! + config.centerY! + 0.5;
    this.drawNeedleCenter(centerX, centerY);
    // Indicator.
    this.context.strokeStyle = 'red';
    if (config.indicatorPositionX && config.indicatorPositionY) {
      this.context.beginPath();
      this.context.ellipse(
        config.indicatorPositionX + 0.5,
        config.indicatorPositionY + 0.5,
        INDICATOR_SIZE / 2,
        INDICATOR_SIZE / 2,
        0,
        0,
        2 * Math.PI
      );
      this.context.stroke();
    }

    this.context.globalAlpha = 1;
  }
}
