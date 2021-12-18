import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  DisplayStateNeedleFieldsType
} from "../state/display.state";
import {PreviewStateImageFieldsType} from "../../../preview/state/preview.state";
import {Store} from "@ngrx/store";
import {changedNeedleConfig, recalculateNeedleSize} from "../state/display.actions";
import {NeedleConfig} from "../models/configs";
import {NEEDLE_FIELD_LABELS} from '../models/configs_metadata';

@Component({
  selector: 'app-needle',
  templateUrl: './needle.component.html',
  styleUrls: ['./needle.component.scss']
})
export class NeedleComponent implements OnChanges{
  @Input() needleConfig?: NeedleConfig;
  // Name of the state field this config corresponds to.
  @Input() fieldName?: DisplayStateNeedleFieldsType;
  // List of names of loaded images.
  @Input() loadedImages?: Set<PreviewStateImageFieldsType>;
  @Input() label = '';

  resizeEnabled = false;
  NEEDLE_FIELD_LABELS = NEEDLE_FIELD_LABELS;

  constructor(private readonly store: Store) {
  }

  valueChanged(value: number, fieldName: keyof NeedleConfig) {
    if (this.needleConfig && this.fieldName) {
      this.store.dispatch(changedNeedleConfig({
        config: {...this.needleConfig, [fieldName]: value},
        displayConfigField: this.fieldName
      }));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loadedImages']) {
      // TODO(pawelszydlo): clean up this ugle translation.
      let imageFieldName: PreviewStateImageFieldsType = 'needleImage1';
      switch (this.fieldName) {
        case 'needle1':
          imageFieldName = 'needleImage1';
          break;
        case 'needle2':
          imageFieldName = 'needleImage2';
          break;
        case 'needle3':
          imageFieldName = 'needleImage3';
          break;
        default:
          console.error(`No image name found for config field ${this.fieldName}`);
      }
      this.resizeEnabled = !!this.loadedImages && this.loadedImages.has(imageFieldName);
    }
  }

  recalculateSize() {
    if (this.fieldName) {
      this.store.dispatch(recalculateNeedleSize({needleField: this.fieldName}))
    }
  }

}
