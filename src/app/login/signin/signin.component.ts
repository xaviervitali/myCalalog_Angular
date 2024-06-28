import { GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../_services/user.service';
import { ApiOptions } from '../../../_models/apiOptions';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    GoogleSigninButtonModule,
    SocialLoginModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  user: SocialUser = new SocialUser();
  loggedIn?: boolean = false;

  public formGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private authService: SocialAuthService,
    private myAuthService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  login() {
    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;
    if (!!username && !!password) {
      this.myAuthService
        .authenticate({ username, password })
        .subscribe((token) => {
          Object.keys(token.preferences).forEach(userPreference=>{
            this.userService.setOption(userPreference as keyof ApiOptions, token.preferences[userPreference])
          })
        
        });
    }
  }
}
