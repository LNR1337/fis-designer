import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {ResizableModule} from 'angular-resizable-element';

import {ConfigComponent} from './config.component';
import {DisplayModule} from './display/display.module';
import {MiscComponent} from './misc/misc.component';
import {TablesComponent} from './tables/tables.component';

@NgModule({
  declarations: [ConfigComponent, TablesComponent, MiscComponent],
  imports: [CommonModule, DisplayModule, MatTabsModule, ResizableModule],
  exports: [ConfigComponent],
})
export class ConfigModule {}
