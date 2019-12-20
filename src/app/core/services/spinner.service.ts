import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationError, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '@angular/router/src/events';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.eventHandler(this.router.events);
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  setIsLoading(value: boolean) {
    this.isLoading$.next(value);
  }

  eventHandler(events: Observable<Event>) {
    events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.setIsLoading(true);
      } else if (
        event instanceof NavigationCancel ||
        event instanceof NavigationEnd ||
        event instanceof NavigationError
      ) {
        this.setIsLoading(false);
      }
    });
  }
}
