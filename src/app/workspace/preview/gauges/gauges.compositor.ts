import {GaugeConfig, NeedleConfig} from "../../config/display/models/configs";

const CENTER_TARGET_SIZE = 10;
const INDICATOR_SIZE = 7;

/** Class responsible for rendering gauges on the canvas. */
export class GaugesCompositor {
  constructor(private context: CanvasRenderingContext2D) {
  }

  clearImage() {
    this.context.clearRect(0, 0, 800, 480);
  }

  drawImage(image: HTMLImageElement, x: number, y: number) {
    this.context.drawImage(image, x, y);
  }

  drawNeedleCenter(x: number, y: number) {
    this.context.globalAlpha = 0.7;
    this.context.strokeStyle = 'yellow';
    this.context.beginPath();
    this.context.moveTo(x - CENTER_TARGET_SIZE, y);
    this.context.lineTo(x + CENTER_TARGET_SIZE, y);
    this.context.moveTo(x, y - CENTER_TARGET_SIZE);
    this.context.lineTo(x, y + CENTER_TARGET_SIZE);
    this.context.stroke();
    this.context.beginPath();
    this.context.ellipse(x, y, CENTER_TARGET_SIZE, CENTER_TARGET_SIZE, 0, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.globalAlpha = 1;
  }

  drawGaugeHighlight(gaugeConfig: GaugeConfig, needleConfig: NeedleConfig) {
    this.context.lineWidth = 1;
    this.context.globalAlpha = 0.7;
    const needleCenterX = needleConfig.positionX! + needleConfig.centerX! + 0.5;
    const needleCenterY = needleConfig.positionY! + needleConfig.centerY! + 0.5;

    const angleStart = gaugeConfig.startAngle! * Math.PI / 180;
    let angleEndDegrees = gaugeConfig.startAngle! + gaugeConfig.angularRange!;
    while (angleEndDegrees > 360) {
      angleEndDegrees = angleEndDegrees - 360;
    }
    const angleEnd = angleEndDegrees * Math.PI / 180;

    // Needle center.
    this.drawNeedleCenter(needleCenterX, needleCenterY);

    // Angles.
    // FIS-Control's angle direction is reversed and translated.
    const startCorrection = 3 / 2 * Math.PI;
    const endCorrection = Math.PI / 2;

    this.context.beginPath();
    this.context.strokeStyle = 'green';
    this.context.moveTo(needleCenterX, needleCenterY);
    this.context.lineTo(needleCenterX + 800 * Math.cos(startCorrection - angleStart), needleCenterY + 800 * Math.sin(startCorrection - angleStart));
    this.context.stroke();

    this.context.beginPath();
    this.context.strokeStyle = 'red';
    this.context.moveTo(needleCenterX, needleCenterY);
    this.context.lineTo(needleCenterX + 800 * Math.cos(endCorrection + angleEnd), needleCenterY + 800 * Math.sin(endCorrection + angleEnd));
    this.context.stroke();

    this.context.globalAlpha = 1;
  }

  drawNeedleHighlight(config: NeedleConfig) {
    this.context.lineWidth = 1;
    this.context.globalAlpha = 0.7;

    // Needle position.
    this.context.strokeStyle = 'cyan';
    this.context.beginPath();
    this.context.moveTo(config.positionX! + 0.5, 0.5);
    this.context.lineTo(config.positionX! + 0.5, config.positionY! + 0.5);
    this.context.lineTo(0.5, config.positionY! + 0.5);
    this.context.stroke();

    // Needle size.
    this.context.strokeStyle = 'yellow';
    this.context.strokeRect(config.positionX! + 0.5, config.positionY! + 0.5, config.width! - 1, config.height! - 1);

    // Needle center.
    const centerX = config.positionX! + config.centerX! + 0.5;
    const centerY = config.positionY! + config.centerY! + 0.5;
    // Needle center.
    this.drawNeedleCenter(centerX, centerY);

    // Indicator.
    this.context.strokeStyle = 'cyan';
    if (config.indicatorPositionX && config.indicatorPositionY) {
      this.context.beginPath();
      this.context.ellipse(config.indicatorPositionX + 0.5 - 3, config.indicatorPositionY + 0.5 - 3, INDICATOR_SIZE, INDICATOR_SIZE, 0, 0, 2 * Math.PI);
      this.context.stroke();
    }

    this.context.setLineDash([]);
    this.context.globalAlpha = 1;
  }

}
