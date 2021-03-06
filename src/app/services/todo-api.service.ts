import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { TodoInfo } from '../interfaces/todo-info';
import { environment } from '../../environments/environment';



@Injectable()
export class TodoApiService {

  baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTodos()  {
    console.log('got Tod from service');

    return this.http.get(
      this.baseUrl + '/api/todos'
    );
  }

  postTodo(theTodo) {
    return this.http.post(
      this.baseUrl + '/api/todos',
      {todoName: theTodo.todo},
      { withCredentials: true }
    );
  }

  postTime(theTimer) {
    return this.http.post(
      this.baseUrl + '/api/todos',
      {todoTimer: theTimer.timerHours},
      { withCredentials: true }
    );
  }



  // DELETE /api/phones/ID
  deletePhone(todoId: string) {
    return this.http.delete(
      this.baseUrl + '/api/todos/' + todoId,
      { withCredentials: true }
    );
  }


}
