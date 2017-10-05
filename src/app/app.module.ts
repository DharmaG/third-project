import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimpleTimer } from 'ng2-simple-timer';

import { HttpClientModule } from '@angular/common/http';
import { AuthApiService } from './services/auth-api.service';
import { TodoApiService } from './services/todo-api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { TodoInputComponent } from './pages/todo-input/todo-input.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TodoInputComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthApiService,
    TodoApiService,
    SimpleTimer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
