import { Component } from '@angular/core';
import { Router } from '@angular/router';


import  { AuthApiService } from "./services/auth-api.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userInfo: any;
  constructor(
  private auth: AuthApiService,
  private router: Router
  ) {  }

  ngOnInit() {
      this.auth.getLoginStatus();

      this.auth.loginStatusNotifier
        .subscribe(
          (loggedInInfo: any) => {
              if (loggedInInfo.isLoggedIn) {
                  this.userInfo = loggedInInfo.userInfo;
              }
            else {
                this.userInfo = null;
            }
        }
      );
}


  logMeOut() {
  // call  log out API method
  this.auth.logOut()
  .subscribe(
    (apiResponse) => {
      this.router.navigate(['/login'])
    }
  );

}

}
