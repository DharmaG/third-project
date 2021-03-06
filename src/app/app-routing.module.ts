import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { TodoInputComponent } from './pages/todo-input/todo-input.component';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path:'signup', component: SignupComponent
  },
  {
    path:'calendar', component: CalendarComponent
  },
  {
    path:'todos', component: TodoInputComponent
  },
  {
    path:'todos/:todoId', component: TodoInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
