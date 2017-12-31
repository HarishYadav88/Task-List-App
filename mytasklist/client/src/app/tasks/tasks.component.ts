import { Component } from '@angular/core';
import { TasksService } from './/tasks.service';
import { Task } from '../models/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  tasks: Task[];
  title: string;

  constructor( private taskService: TasksService) {
      this.taskService.getTasks()
          .subscribe(tasks => {
            this.tasks = tasks;
          });
  }

  addTask(event) {
    event.preventDefault();
    const newTask = {
      title: this.title,
      isDone: false
    };

    this.taskService.addTask(newTask)
        .subscribe(task => {
          this.tasks.push(task);
          this.title = '';
        });

  }

  deleteTask(id) {
    const tasks = this.tasks;

    this.taskService.deleteTask(id)
        .subscribe(data => {
            if (data.n === 1) {
                for (let i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id === id) {
                        tasks.splice(i, 1);
                    }
                }
            }
        });

  }

  updateTask(task) {
    const _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };

    this.taskService.updateTask(_task)
    .subscribe(data => {
        task.isDone = !task.isDone;
    });

  }

}
