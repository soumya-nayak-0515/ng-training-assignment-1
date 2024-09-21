import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskSeviceService } from '../services/task-sevice.service';

@Component({
  selector: 'app-add-edit-task-form',
  templateUrl: './add-edit-task-form.component.html',
  styleUrl: './add-edit-task-form.component.scss'
})
export class AddEditTaskFormComponent {
  @Input() task: any = {
    id: null,
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    description: '',
  };

  @Output() taskSaved = new EventEmitter();

  assignedToOptions = ['User1', 'User2', 'User3', 'User4'];
  statusOptions = ['Completed', 'In Progress', 'Not Started'];
  priorityOptions = ['High', 'Low', 'Normal'];

  constructor(
    private taskService: TaskSeviceService
  ) {

  }

  saveTask(taskForm:any) {
    if(taskForm.invalid){
      return;
    }
    if (this.task.id) {
      this.taskService.updateTask(this.task);
    } else {
      this.task.id = new Date().getTime();
      this.taskService.addTask(this.task);
    }
    this.taskSaved.emit();
  }

  // Close the modal
  closeModal() {
    this.taskSaved.emit();
  }
}
