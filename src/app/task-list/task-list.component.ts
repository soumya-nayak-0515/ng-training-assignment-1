import { Component, OnInit } from '@angular/core';
import { TaskSeviceService } from '../services/task-sevice.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: any = [];
  isModalOpen = false;
  selectedTask: any = {
    id: null,
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    description: '',
  };
  filteredTasks: any[] = [];
  searchQuery: string = '';
  showDeleteModal = false;
  paginatedTasks: any[] = []; // Tasks for the current page
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;


  constructor(
    private taskService: TaskSeviceService,
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  // Load tasks from service
  loadTasks() {
    this.tasks = this.taskService.getTasks();    
    this.filteredTasks = this.tasks;  // Initialize filteredTasks with all tasks
    this.updatePagination();
  }

  // Update paginated tasks after pagination or search
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredTasks.length / this.pageSize);
    this.paginatedTasks = this.filteredTasks.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  // Navigate to First Page
  goToFirstPage() {
    this.currentPage = 1;
    this.updatePagination();
  }

  // Navigate to Previous Page
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Navigate to Next Page
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Navigate to Last Page
  goToLastPage() {
    this.currentPage = this.totalPages;
    this.updatePagination();
  }

  // Search function
  onSearch() {
    if (this.searchQuery.trim()) {
      this.filteredTasks = this.tasks.filter((task:any) =>
        task.assignedTo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        task.status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        task.priority.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredTasks = this.tasks;
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  openNewTaskModal() {
    this.selectedTask = {
      id: null,
      assignedTo: '',
      status: '',
      dueDate: '',
      priority: '',
      description: '',
    };
    this.isModalOpen = true;
  }

  editTask(task: any) {
    this.selectedTask = { ...task };
    this.isModalOpen = true;
  }

  openDeleteModal(task: any) {
    this.selectedTask = task;
    this.showDeleteModal = true;
  }

  // Close the delete confirmation modal
  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  // Delete the task
  deleteTask() {
    if (this.selectedTask) {
      this.taskService.deleteTask(this.selectedTask.id);
      this.tasks = this.taskService.getTasks();  // Refresh the task list
      this.loadTasks();
      this.closeDeleteModal();
    }
  }

  handleTaskSaved() {
    this.isModalOpen = false;
    this.loadTasks();
  }

  refreshPage(){
    window.location.reload();
  }
}
