import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from '../../services/auth-api.service';
import { SignupInfo } from '../../interfaces/signup-info';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  newUser: SignupInfo = {
  signupFullName: '',
  signupUserName: '',
  signupPassword: ''
};


  errorMessage: string;


  constructor(
    private auth: AuthApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signupSubmit() {
    this.auth.postSignup(this.newUser)
    .subscribe(
      (userInfo) => {
        this.router.navigate(['']);
      },

      (errInfo) => {
        console.log('Sign up error',  errInfo);
        if(errInfo.status === 400) {
          this.errorMessage = 'Validation error';
        }
        else {
          this.errorMessage = 'Something went wrong. Try again later.'
        }
      }
    );
}



}
