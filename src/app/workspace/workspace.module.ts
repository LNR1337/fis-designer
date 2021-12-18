import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';

import {ConfigModule} from './config/config.module';
import {PreviewModule} from './preview/preview.module';
import {ServicesModule} from './services/services.module';
import {WorkspaceComponent} from './workspace.component';

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [CommonModule, ConfigModule, PreviewModule, ServicesModule, MatSidenavModule],
  exports: [WorkspaceComponent],
})
export class WorkspaceModule {}
