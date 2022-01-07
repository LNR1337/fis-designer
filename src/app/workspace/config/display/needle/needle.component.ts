import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ImageStateFieldsType} from '../../../image-manager/state/images.state';
import {ConfigStateNeedleFieldsType} from '../../state/config.state';
import {Store} from '@ngrx/store';
import {changedNeedleConfig, recalculateNeedleSize} from '../../state/config.actions';
import {NeedleConfig, NeedleConfigFields, NeedleConfigFieldsType} from '../../models/configs';
import {
  NEEDLE_DISPLAY_TO_PREVIEW_FIELD,
  NEEDLE_FIELD_METADATA,
} from '../../models/configs_metadata';

@Component({
  selector: 'app-needle',
  templateUrl: './needle.component.html',
  styleUrls: ['./needle.component.scss'],
})
export class NeedleComponent implements OnChanges {
  @Input() needleConfig?: NeedleConfig;
  // Name of the state field this config corresponds to.
  @Input() fieldName?: ConfigStateNeedleFieldsType;
  // List of names of loaded images.
  @Input() loadedImages?: Set<ImageStateFieldsType>;
  @Input() label = '';

  resizeEnabled = false;
  NEEDLE_FIELD_METADATA = NEEDLE_FIELD_METADATA;
  NeedleConfigFields = NeedleConfigFields;

  constructor(private readonly store: Store) {}

  valueChanged(value: number, fieldName: keyof NeedleConfig) {
    if (this.needleConfig && this.fieldName) {
      this.store.dispatch(
        changedNeedleConfig({
          config: {...this.needleConfig, [fieldName]: value},
          displayConfigField: this.fieldName,
        })
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loadedImages'] && this.fieldName) {
      const previewImageField = NEEDLE_DISPLAY_TO_PREVIEW_FIELD[this.fieldName];
      this.resizeEnabled = !!this.loadedImages && this.loadedImages.has(previewImageField);
    }
  }

  recalculateSize() {
    if (this.fieldName) {
      this.store.dispatch(
        recalculateNeedleSize({
          configStateNeedleField: this.fieldName,
          previewStateImageField: NEEDLE_DISPLAY_TO_PREVIEW_FIELD[this.fieldName],
        })
      );
    }
  }

  trackBy(index: number, value: NeedleConfigFieldsType) {
    return value;
  }
}
