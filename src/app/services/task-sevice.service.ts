import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskSeviceService {
  private localStorageKey = 'tasks';

  constructor() { }

  getTasks() {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  addTask(task: any) {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  updateTask(updatedTask: any) {
    let tasks = this.getTasks();
    tasks = tasks.map((task: any) => (task.id === updatedTask.id ? updatedTask : task));
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  deleteTask(taskId: number) {
    let tasks = this.getTasks();
    tasks = tasks.filter((task: any) => task.id !== taskId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
}
