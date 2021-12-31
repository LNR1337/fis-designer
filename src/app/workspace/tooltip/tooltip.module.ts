import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TooltipComponent} from './tooltip.component';
import {TooltipDirective} from './tooltip.directive';

@NgModule({
  declarations: [TooltipComponent, TooltipDirective],
  imports: [BrowserModule, BrowserAnimationsModule],
  entryComponents: [TooltipComponent],
  providers: [],
  exports: [TooltipDirective, TooltipComponent],
})
export class TooltipModule {}
