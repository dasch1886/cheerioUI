import { UserService } from './../../core/http/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoute } from '../../app.route';
import { LoginRoute } from './login.route';
import { SessionService } from '../../core/services/session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './styles/common-styles.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private sessionService: SessionService) { }

  public loginGroup: FormGroup;
  ngOnInit() {
    this.loginInit();
  }

  private loginInit() {
    this.loginGroup = this.fb.group({
      login: '',
      password: ''
    });
  }

  goToRegistration() {
    this.router.navigateByUrl(this.router.url + '/' + LoginRoute.REGISTRATION);
  }


  logIn() {
    this.userService.login(
      this.loginGroup.get('login').value,
      this.loginGroup.get('password').value
    ).subscribe(() => {
      this.sessionService.getIsLogged().subscribe(result => {
        if (result) {
          this.router.navigateByUrl(AppRoute.HOME);
        }
      });
    },
      err => {
        console.log(err);
      });
  }
}
