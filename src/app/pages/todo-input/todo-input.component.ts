import { Component, OnInit } from '@angular/core';

import { SimpleTimer } from 'ng2-simple-timer';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs/Rx';



import { TodoApiService } from '../../services/todo-api.service';
import { AuthApiService } from '../../services/auth-api.service';


@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  todos: any[] = [];

  userInfo: any;
  today: any;

  newTodo: any = {};


  ticks = 0;
  counter0: number = 0;
  minuteCounter: number = 0;
  hoursCounter: number = 0;
  timer0Id: string;
  timer0button = 'Subscribe';

  sub: Subscription;




  constructor(
    private todo: TodoApiService,
    private auth: AuthApiService,
    private timer: SimpleTimer,
    private date: DatePipe

  ) { }

  ngOnInit() {
    this.today = this.date.transform(Date.now());
    this.timer.newTimer('1sec', 1);
    this.subscribeTimer0();

    this.todo.getTodos()
    .subscribe(
      (todosFromApi: any[]) => {
        this.todos = todosFromApi

      }
    );

    this.auth.getLoginStatus()
    .subscribe(
      (loggedInInfo: any) => {
        if (loggedInInfo.isLoggedIn) {
          this.userInfo = loggedInInfo.userInfo;
        }
      }
    );

  } //  closing  ngOnInit() {
    //


    delAllTimer() {
         this.timer.delTimer('1sec');
       }

       subscribeTimer0() {
       if (this.timer0Id) {
         // Unsubscribe if timer Id is defined
         this.timer.unsubscribe(this.timer0Id);
         this.timer0Id = undefined;
         this.timer0button = 'Subscribe';
         console.log('timer 0 Unsubscribed.');
       } else {
         // Subscribe if timer Id is undefined
         this.timer0Id = this.timer.subscribe('1sec', () => this.timer0callback());
         this.timer0button = 'Unsubscribe';
         console.log('timer 0 Subscribed.');
       }
       console.log(this.timer.getSubscription());

       const timer = Observable.timer(1,1000);
       this.sub = timer.subscribe(
         t => {
           this.ticks = t;

           this.counter0 = this.getSeconds(this.ticks);
           this.minuteCounter = this.getMinutes(this.ticks);
           this.hoursCounter = this.getHours(this.ticks);
         }
       );

       }

       timer0callback(): void {
       this.counter0++;
       this.minuteCounter++;
       this.hoursCounter++;
       }

saveNewTodo() {
  this.todo.postTodo(this.newTodo)
  .subscribe(
    (todo) => {
      console.log('Success');
      // this.newTodo = {};
      this.todos.push(todo);
    }
  )
}

    startTimer() {
    }

    getSeconds(ticks: number) {
      return this.pad(ticks % 60);
    }

    getMinutes(ticks: number) {
      return this.pad((Math.floor(ticks / 60)) % 60);
    }

    getHours(ticks: number) {
      return this.pad(Math.floor((ticks / 60) / 60));
    }

    pad(digit: any) {
      return digit <= 9 ? '0' + digit : digit;
    }




}