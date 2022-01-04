import {Component, Input} from '@angular/core';
import {ImageStateFieldsType} from '../../../image-manager/state/images.state';
import {ConfigStateNeedleFieldsType} from '../../state/config.state';
import {Store} from '@ngrx/store';
import {changedNeedleConfig} from '../../state/config.actions';
import {NeedleConfig, NeedleConfigFields} from '../../models/configs';
import {
  NEEDLE_FIELD_METADATA,
} from '../../models/configs_metadata';

@Component({
  selector: 'app-needle',
  templateUrl: './needle.component.html',
  styleUrls: ['./needle.component.scss'],
})
export class NeedleComponent {
  @Input() needleConfig?: NeedleConfig;
  // Name of the state field this config corresponds to.
  @Input() fieldName?: ConfigStateNeedleFieldsType;
  // List of names of loaded images.
  @Input() loadedImages?: Set<ImageStateFieldsType>;
  @Input() label = '';

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
}
