import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ResizableModule} from 'angular-resizable-element';

import {ConfigModule} from './config/config.module';
import {PreviewModule} from './preview/preview.module';
import {ServicesModule} from './services/services.module';

import {WorkspaceComponent} from './workspace.component';

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [CommonModule, ConfigModule, PreviewModule, ResizableModule, ServicesModule],
  exports: [WorkspaceComponent],
})
export class WorkspaceModule {}
