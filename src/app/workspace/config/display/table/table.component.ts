import {Component, Input} from '@angular/core';
import {ConfigStateTableFieldsType} from '../../state/config.state';
import {Store} from '@ngrx/store';
import {TableConfig, TableConfigFields, TableRowConfigFields} from '../../models/configs';
import {TABLE_FIELD_METADATA, TABLE_ROW_FIELD_METADATA} from '../../models/configs_metadata';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  // Configuration for this table.
  @Input() tableConfig?: TableConfig;
  // Name of the state field this config corresponds to.
  @Input() fieldName?: ConfigStateTableFieldsType;
  // List of names of loaded images.
  @Input() label = '';

  TABLE_FIELD_METADATA = TABLE_FIELD_METADATA;
  TABLE_ROW_FIELD_METADATA = TABLE_ROW_FIELD_METADATA;
  TableConfigFields = TableConfigFields;
  TableRowConfigFields = TableRowConfigFields;

  constructor(private readonly store: Store) {}
}
