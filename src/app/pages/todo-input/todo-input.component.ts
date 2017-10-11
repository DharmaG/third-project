import { Component, OnInit } from '@angular/core';

import { SimpleTimer } from 'ng2-simple-timer';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarComponent } from '../../pages/calendar/calendar.component';



import { TodoApiService } from '../../services/todo-api.service';
import { AuthApiService } from '../../services/auth-api.service';

declare var jquery:any;
declare var $ :any;


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
  timerTodo: any = {};


  ticks = 0;
  counter0: number = 0;
  timer0Id: string;
  timer0button = 'Subscribe';

  sub: Subscription;

  show: any[] = [];
  input: any[] = [];






  constructor(
    private todo: TodoApiService,
    private auth: AuthApiService,
    private timer: SimpleTimer,
    private date: DatePipe,
    private router: Router

  ) {}

  ngOnInit() {
    // setInterval(function() {
    //     alert('Times Up')
    // }, 20000);

    this.today = Date.now();

    setInterval(() => { this.today = Date.now();}, 1000);


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

saveNewTodo() {
  this.todo.postTodo(this.newTodo)
  .subscribe(
    (todo) => {
      console.log('Success');
      // this.newTodo = {};
      this.todos.push(todo);
    }
  );
}

saveTimerTodo() {
  this.todo.postTime(this.timerTodo)
  .subscribe(
    (timer) => {
      console.log(timer);
      this.todos.push(timer);
    }
  );
}


deleteClick(deleteTask) {
  // call the API for deletion
  this.todo.deletePhone(deleteTask._id)
    .subscribe(
      () => {
        // remove from array

        this.todos.forEach((oneTask) => {
          //loop through todos aray and check for deleted Task
          if(oneTask._id === deleteTask._id) {
            // if the delTask's id is equal to one of the tasks in the array
            //remove it from the array
            //The index of what needs to be removed
            let theIndexOfWhatNeedsToBeGone = this.todos.indexOf(oneTask);
            //Splice using the index + 1 pos forward
            this.todos.splice(theIndexOfWhatNeedsToBeGone,1);
            console.log(this.todos)

          }
        });
         this.todos.indexOf(deleteTask._id);
         if (deleteTask._id != deleteTask._id){
           this.todos.splice(deleteTask._id);
           return;
         }
         this.router.navigate(['todos']);
      }
    );
    console.log(this.todos);
    //remove it from the toDoList array in the frontend

  }


    checkboxChange(todo) {
      if (todo.isChecked) {
        todo.isChecked= false;
      }
      else {
        todo.isChecked = true;
      }

    }


    timing(index) {
        if (this.show[index]) {
          this.show[index] = false;
        }
        else {
          this.show[index] = true;
        }
        // console.log($(`${theTodo_id}`));
      // $(theTodo._id).append('<p> PLSSS WORK </p>');
          }







}
