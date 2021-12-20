import {
  GaugeConfig, getAbsoluteNeedleAngleBounds, NeedleConfig
} from "../../config/display/models/configs";

const CENTER_TARGET_SIZE = 10;
const INDICATOR_SIZE = 7;

/** Class responsible for rendering gauges on the canvas. */
export class GaugesCompositor {
  constructor(private context: CanvasRenderingContext2D) {
    this.context.font = '10px sans-serif';
  }

  clearImage() {
    this.context.clearRect(0, 0, 800, 480);
  }

  drawImage(image: HTMLImageElement, x: number, y: number) {
    this.context.drawImage(image, x, y);
  }

  drawImageRotatedAround(image: HTMLImageElement, positionX: number, positionY: number,
                         rotationX: number, rotationY: number, rotationAngle: number) {
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
    }
    this.drawImage(image, 0, 0);
    this.context.globalAlpha = 1;
  }

  drawNeedleCenter(x: number, y: number, showCoords: boolean = true) {
    this.context.globalAlpha = 0.7;
    this.context.strokeStyle = 'cyan';
    this.context.fillStyle = 'cyan';
    // Target cross.
    this.context.beginPath();
    this.context.moveTo(x - CENTER_TARGET_SIZE, y);
    this.context.lineTo(x + CENTER_TARGET_SIZE, y);
    this.context.moveTo(x, y - CENTER_TARGET_SIZE);
    this.context.lineTo(x, y + CENTER_TARGET_SIZE);
    this.context.stroke();
    this.context.beginPath();
    this.context.ellipse(x, y, CENTER_TARGET_SIZE, CENTER_TARGET_SIZE, 0, 0, 2 * Math.PI);
    this.context.stroke();
    // Coordinate labels.
    if (showCoords) {
      this.context.textAlign = 'start';
      this.context.textBaseline = 'top';
      this.context.fillText(`y:${y - 0.5}`, x + CENTER_TARGET_SIZE + 5, y + 2);
      this.context.textBaseline = 'bottom';
      this.context.fillText(`x:${x - 0.5}`, x + CENTER_TARGET_SIZE + 5, y - 2);
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
    this.context.lineTo(needleCenterX + 800 * Math.cos(angleStart),
      needleCenterY + 800 * Math.sin(angleStart));
    this.context.stroke();
    // End line.
    this.context.beginPath();
    this.context.strokeStyle = 'red';
    this.context.moveTo(needleCenterX, needleCenterY);
    this.context.lineTo(needleCenterX + 800 * Math.cos(angleEnd),
      needleCenterY + 800 * Math.sin(angleEnd));
    this.context.stroke();
    // Direction line.
    let ellipseStart = angleStart;
    let ellipseEnd = angleEnd;
    if (gaugeConfig.angularRange! < 0) {
      [ellipseStart, ellipseEnd] = [ellipseEnd, ellipseStart];
    }
    const ellipseRadius = Math.abs(needleCenterY - needleConfig.positionY!);
    this.context.beginPath();
    this.context.ellipse(needleCenterX, needleCenterY, ellipseRadius, ellipseRadius, 0,
      ellipseStart, ellipseEnd);
    this.context.stroke();
    const ellipseRadius2 = Math.max(0, ellipseRadius - needleConfig.height!);
    this.context.beginPath();
    this.context.ellipse(needleCenterX, needleCenterY, ellipseRadius2, ellipseRadius2, 0,
      ellipseStart, ellipseEnd);
    this.context.stroke();

    this.context.globalAlpha = 1;
  }

  drawNeedleHighlight(config: NeedleConfig) {
    this.context.lineWidth = 1;
    this.context.globalAlpha = 0.7;
    // Needle position.
    this.context.strokeStyle = 'cyan';
    this.context.fillStyle = 'cyan';
    this.context.beginPath();
    this.context.moveTo(config.positionX! + 0.5, 0.5);
    this.context.lineTo(config.positionX! + 0.5, config.positionY! + 0.5);
    this.context.lineTo(0.5, config.positionY! + 0.5);
    this.context.stroke();
    // Position coordinates.
    this.context.textAlign = 'start';
    this.context.textBaseline = 'bottom';
    this.context.fillText(`y:${config.positionY!}`, 5, config.positionY! - 5);
    this.context.textBaseline = 'top';
    this.context.textAlign = 'end';
    this.context.fillText(`x:${config.positionX!}`, config.positionX! - 5, 5);
    // Needle size.
    this.context.strokeStyle = 'yellow';
    this.context.fillStyle = 'yellow';
    this.context.strokeRect(config.positionX! + 0.5, config.positionY! + 0.5, config.width! - 1,
      config.height! - 1);
    // Needle middle strikethrough.
    const needleMiddleX = config.positionX! + Math.floor(config.width! / 2) + 0.5;
    this.context.beginPath();
    this.context.moveTo(needleMiddleX, 0);
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
    this.context.strokeStyle = 'cyan';
    if (config.indicatorPositionX && config.indicatorPositionY) {
      this.context.beginPath();
      this.context.ellipse(config.indicatorPositionX + 0.5 - 3, config.indicatorPositionY + 0.5 - 3,
        INDICATOR_SIZE, INDICATOR_SIZE, 0, 0, 2 * Math.PI);
      this.context.stroke();
    }

    this.context.setLineDash([]);
    this.context.globalAlpha = 1;
  }

}
