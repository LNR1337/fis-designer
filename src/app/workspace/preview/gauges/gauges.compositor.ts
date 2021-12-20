import {
  GaugeConfig, getAbsoluteNeedleAngleBounds,
  NeedleConfig
} from "../../config/display/models/configs";

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

  drawImageRotatedAround(image: HTMLImageElement, positionX: number, positionY: number,
                         rotationX: number, rotationY: number, rotationAngle: number) {
    this.context.translate(rotationX, rotationY);
    this.context.rotate(rotationAngle);
    this.context.translate(-rotationX, -rotationY);
    this.context.drawImage(image, positionX, positionY);
    // Reset transformations.
    this.context.setTransform(1, 0, 0, 1, 0, 0);
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

    const [angleStart, angleEnd] = getAbsoluteNeedleAngleBounds(gaugeConfig);

    // Needle center.
    this.drawNeedleCenter(needleCenterX, needleCenterY);
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
    this.context.beginPath();
    let ellipseStart = angleStart;
    let ellipseEnd = angleEnd;
    if (gaugeConfig.angularRange! < 0) {
      [ellipseStart, ellipseEnd] = [ellipseEnd, ellipseStart];
    }
    const ellipseRadius = Math.abs(needleCenterY - needleConfig.positionY!);
    this.context.ellipse(needleCenterX, needleCenterY, ellipseRadius, ellipseRadius, 0,
      ellipseStart, ellipseEnd);
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
    this.context.strokeRect(config.positionX! + 0.5, config.positionY! + 0.5, config.width! - 1,
      config.height! - 1);

    // Needle center.
    const centerX = config.positionX! + config.centerX! + 0.5;
    const centerY = config.positionY! + config.centerY! + 0.5;
    // Needle center.
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
