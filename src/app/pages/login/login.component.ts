import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from '../../services/auth-api.service';
import { LoginInfo } from '../../interfaces/login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: LoginInfo = {
  loginUsername: '',
  loginPassword: ''
};

  loginError: string;

  constructor(
    private auth: AuthApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginSubmit(){
    // call the service method
    this.auth.postLogin(this.loginUser)
    .subscribe(
      // if success, redirect home
      (userInfo) => {
        this.router.navigate(['todos']);
      },

      //if error, show feedback
      (errInfo) => {
        console.log('Log in error', errInfo);
        if(errInfo.status === 401) {
          this.loginError = 'Bad credentials';
        }
        else {
          this.loginError = 'Something went wrong. Try again later';
        }
      }
    );
  }

}
