import { environment } from './../../../environments/environment';
import { Task } from './task';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Task[]>(`${environment.api}/api/tasks`);
  }

  getById(id: string) {
    return this.http.get<Task>(`${environment.api}/api/tasks/${id}`);
  }

  save(task: Task) {
    const taskBody = {
      description: task.description,
      completed: task.completed
    };

    if (task.id) {
      return this.http.put<Task>(`${environment.api}/api/tasks/${task.id}`, taskBody);
    } else {
      return this.http.post<Task>(`${environment.api}/api/tasks`, taskBody);
    }
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/api/tasks/${id}`);
  }
}
