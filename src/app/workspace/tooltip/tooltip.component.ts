import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  styleUrls: ['./tooltip.component.scss'],
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent {
  @Input() text = '';
}
