import {ComponentRef, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';

import {TooltipComponent} from './tooltip.component';

@Directive({selector: '[tooltip]'})
export class TooltipDirective implements OnInit {
  @Input('tooltip') text = '';
  private overlayRef?: OverlayRef;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8,
        },
      ]);

    this.overlayRef = this.overlay.create({positionStrategy});
  }

  @HostListener('mouseenter')
  show() {
    if (!this.text) return;
    if (this.overlayRef?.hasAttached()) this.overlayRef!.detach();
    const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef!.attach(
      new ComponentPortal(TooltipComponent)
    );
    tooltipRef.instance.text = this.text;
    // Delay display.
    setTimeout(() => (tooltipRef.location.nativeElement.style.opacity = '1'), 500);
  }

  @HostListener('mouseleave')
  hide() {
    this.overlayRef!.detach();
  }
}
