import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    GoogleSigninButtonModule,
    SocialLoginModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user: SocialUser = new SocialUser();
  loggedIn?: boolean = false;

  public formGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',  Validators.required),
  });
  constructor(
    private authService: SocialAuthService,
    private myAuthService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log(user);
      
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  login() {
    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password 
    if(!!username && !!password){
      this.myAuthService.authenticate({username, password}).subscribe(token=>{
        console.log(token);
        
      })
    }
  }
}
