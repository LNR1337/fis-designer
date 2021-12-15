import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { PreviewModule } from './preview/preview.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [CommonModule, PreviewModule, ServicesModule],
  exports: [WorkspaceComponent],
})
export class WorkspaceModule {}
