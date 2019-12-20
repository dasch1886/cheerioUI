import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoute } from '../../app.route';
import { SessionService } from '../../core/services/session.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router,
    private sessionService: SessionService) { }

  hamburger: Boolean = false;
  isLogged: Boolean = false;

  ngOnInit() {
    this.sessionService.getIsLogged().subscribe(res => {
      console.log(res);
      this.isLogged = res;
    });
  }

  hamburgerAnimation() {
    this.hamburger = !this.hamburger;
  }

  goToLogin() {
    this.router.navigateByUrl('/' + AppRoute.LOGIN);
  }

  goToHome() {
    this.router.navigateByUrl('/' + AppRoute.HOME);
  }

  logOut() {
    this.sessionService.logOut();
    this.goToLogin();
  }
}
