import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { SignupInfo } from '../interfaces/signup-info';
import { LoginInfo } from '../interfaces/login-info';

// UNCOMMENT TO DEPLOY ------------------------
// import { environment } from '../../environments/environment';

@Injectable()
export class AuthApiService {

  baseUrl: string = 'http://localhost:3000';

    loginStatusSubject = new BehaviorSubject<any>({ isLoggedIn: false });
    loginStatusNotifier = this.loginStatusSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }


  // POST /api/process-signup
    postSignup(userInfo: SignupInfo) {
        return (
          this.http.post(
              this.baseUrl + '/api/process-signup',
              userInfo,
              { withCredentials: true }
          ) // need "withCredentials" for APIs that use the session
          .do((userInfo) => {
              this.loginStatusSubject.next({
                  isLoggedIn: true,
                  userInfo: userInfo
              });
          })
        ); // return (
    } // postSignup()

    // GET /api/checklogin
    getLoginStatus() {

        return (
          this.http.get(
              this.baseUrl + '/api/checklogin',
              { withCredentials: true }
          ) // need "withCredentials" for APIs that use the session
          .do((loggedInInfo) => {
              this.loginStatusSubject.next(loggedInInfo);
          })
        ); // return (
    } // getLoginStatus()

    // POST /api/process-login
    postLogin(loginCredentials: LoginInfo) {
        return (
          this.http.post(
              this.baseUrl + '/api/process-login',
              loginCredentials,
              { withCredentials: true }
          ) // need "withCredentials" for APIs that use the session
          .do((userInfo) => {
              this.loginStatusSubject.next({
                  isLoggedIn: true,
                  userInfo: userInfo
              });
          })
        ); // return (
    } // loginRequest()

    //DELETE /api/logMeOut
    logOut(){
      const logoutRequest =
       this.http.delete(
        this.baseUrl + '/api/logout',
        { withCredentials: true }
      );
      logoutRequest.subscribe(() => {
        this.loginStatusSubject.next({ isLoggedIn: false })
      });
      return logoutRequest;
    }


}
