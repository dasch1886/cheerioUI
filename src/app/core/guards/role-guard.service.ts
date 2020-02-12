import { Injectable } from '@angular/core';
import { SessionService } from '../services/session.service';
import { AppRoute } from 'src/app/app.route';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private sessionService: SessionService,
    private router: Router) { }

    canActivate(): boolean {
      console.log('canActivate');
      if(!this.sessionService.isAuthenticated()) {
        alert('You have to been logged');
        this.router.navigateByUrl(AppRoute.LOGIN);

        return false;
      }

      return true;
    }


}
