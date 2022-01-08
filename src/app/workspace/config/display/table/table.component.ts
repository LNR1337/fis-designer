import {Component, Input} from '@angular/core';
import {controlUnits} from '../../../../../assets/js/fis-control-binary-converter/control-units';
import {changedTableConfig} from '../../state/config.actions';
import {ConfigStateTableFieldsType} from '../../state/config.state';
import {Store} from '@ngrx/store';
import {
  TableConfig,
  TableConfigFields,
  TableConfigFieldsType,
  TableRowConfig,
  TableRowConfigFields,
  TableRowConfigFieldsType,
} from '../../models/configs';
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
  controlUnits = controlUnits;
  a = Array.from(controlUnits.entries())
    .map(([id, config]): [number, string] => [id, config.name])
    .sort((a, b) => (a[1] > b[1] ? 1 : -1));

  controlUnitOptions = new Map<number, string>(this.a);

  constructor(private readonly store: Store) {}

  tableValueChanged(value: number | TableRowConfig[], fieldName: TableConfigFieldsType) {
    if (this.tableConfig && this.fieldName) {
      this.store.dispatch(
        changedTableConfig({
          config: {...this.tableConfig, [fieldName]: value},
          displayConfigField: this.fieldName,
        })
      );
    }
  }

  rowValueChanged(rowId: number, value: number | string, fieldName: TableRowConfigFieldsType) {
    if (this.tableConfig) {
      const rows = this.tableConfig.rows.map((row, index) =>
        index === rowId ? {...row, [fieldName]: value} : row
      );
      this.tableValueChanged(rows, 'rows');
    }
  }

  rowTrackBy(index: number, row: TableRowConfig) {
    return index;
  }
}
