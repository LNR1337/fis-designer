import {Component} from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  public style: object = {};

  constructor() {}

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      width: `${Math.min(event.rectangle.width ?? 480, window.screen.width)}px`,
    };
  }
}
