import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { SharedService } from '../services/shared.services';

@Directive({
  selector: '[appWeekend]',
})
export class WeekendDirective implements OnInit, OnDestroy {
  @Input('day') day: number;
  @Input('month') month: number;
  @Input('year') year: number;
  @Input('event') event: number;
  subscription: Subscription;

  constructor (private renderer2: Renderer2, private elementRef: ElementRef, private sharedService: SharedService) {}

  ngOnInit() {
    this.processStyle();
    this.subscription = this.sharedService.onChangeMonth.subscribe(() => {
      this.processStyle();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) this.subscription.unsubscribe();
  }

  processStyle () {
    const date = new Date(this.year, this.month - 1, this.day - 1).getDay();
    if (date >= 5) {
      this.renderer2.setStyle(this.elementRef.nativeElement, 'color', 'red');
      // this.renderer2.setStyle(this.elementRef.nativeElement, 'fontWeight', 'bold');
      // if (this.event > 0) this.renderer2.setStyle(this.elementRef.nativeElement, 'color', 'blue');
    }
  }
}


// appWeekend
// [year]="calendar.year"
// [month]="month"
// [day]="+day"
// [event]="calendar.calendar[month][day].events.length"
