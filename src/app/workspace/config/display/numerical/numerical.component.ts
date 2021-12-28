import {Component, Input, OnInit} from '@angular/core';
import {NumericalConfig} from '../models/configs';
import {DisplayStateNumericalFieldsType} from '../state/display.state';

@Component({
  selector: 'app-numerical',
  templateUrl: './numerical.component.html',
  styleUrls: ['./numerical.component.scss'],
})
export class NumericalComponent implements OnInit {
  @Input() numericalConfig?: NumericalConfig;
  // Name of the state field this config corresponds to.
  @Input() fieldName?: DisplayStateNumericalFieldsType;
  @Input() label = '';

  constructor() {}

  ngOnInit(): void {}
}
