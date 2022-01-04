import {
  GaugeConfig,
  getAbsoluteNeedleAngleBounds,
  NeedleConfig,
  NumericalConfig,
} from '../../config/models/configs';
import {ConfigStateGeneralFieldsConfig} from '../../config/state/config.state';

const GUIDES_FONT = '10px sans-serif';
const STATUS_BAR_FONT = '22px sans-serif';
const CROSS_SIZE = 10;
const INDICATOR_SIZE = 7;
const NUMERICAL_DIGITS = 3;
const GTI_FONT_WIDTH = 28;
const GTI_FONT_HEIGHT = 24;
const STATUS_BAR_HEIGHT = 40;

/** Class responsible for rendering gauges on the canvas. */
export class GaugesCompositor {
  constructor(private context: CanvasRenderingContext2D) {}

  clearImage() {
    this.context.clearRect(0, 0, 800, 480);
  }

  drawImage(image: HTMLImageElement, x: number, y: number) {
    this.context.drawImage(image, x, y);
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

  drawBackground(image: HTMLImageElement, highlight: boolean) {
    if (highlight) {
      this.context.globalAlpha = 0.5;
    } else {
      this.context.globalAlpha = 1;
    }
    this.drawImage(image, 0, 0);
    this.context.globalAlpha = 1;
  }

  drawStatusBar(highlight: boolean) {
    if (highlight) {
      this.context.globalAlpha = 0.5;
    } else {
      this.context.globalAlpha = 1;
    }
    const statusBarY = 479.5 - STATUS_BAR_HEIGHT;
    this.context.font = STATUS_BAR_FONT;
    this.context.fillStyle = '#333333';
    this.context.fillRect(0.5, statusBarY, 799, STATUS_BAR_HEIGHT);
    this.context.fillStyle = '#666666';
    this.context.fillRect(0.5, statusBarY, 799, 4);
    this.context.fillStyle = '#999999';
    this.context.fillRect(0.5, statusBarY, 799, 3);
    this.context.fillStyle = '#ffffff';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'top';
    const date = new Date();
    this.context.fillText(`${date.toTimeString().substr(0, 5)}`, 399, statusBarY + 10);
    this.context.globalAlpha = 1;
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

  drawStatusBarHighlight() {
    this.context.lineWidth = 1;
    this.context.globalAlpha = 0.7;
    this.context.strokeStyle = 'yellow';
    this.context.strokeRect(0.5, 479.5 - STATUS_BAR_HEIGHT, 799, STATUS_BAR_HEIGHT);
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
