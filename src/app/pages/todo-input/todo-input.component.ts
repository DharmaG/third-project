import { Component, OnInit } from '@angular/core';

import { SimpleTimer } from 'ng2-simple-timer';

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

  newTodo: any = {};

  counter0 = 0;
  timer0Id: string;
  timer0button = 'Subscribe';


  constructor(
    private todo: TodoApiService,
    private auth: AuthApiService,
    private timer: SimpleTimer
  ) { }

  ngOnInit() {
    this.timer.newTimer('1sec', 1);
    this.subscribeTimer0();


    console.log('init')
    this.todo.getTodos()
    .subscribe(
      (todosFromApi: any[]) => {
        this.todos = todosFromApi
        console.log('THE TODODS', this.todos);
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

    }

    timer0callback(): void {
    this.counter0++;
    }
}
