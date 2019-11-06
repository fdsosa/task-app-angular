import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tasks = []
  impTasks = []
  constructor() { }

  ngOnInit() {
    this.tasks = [
      {
        title: 'Title of the task',
        description: 'Descripton of the task'
      },
      {
        title: 'Other title of the task',
        description: 'Other descripton of the task'
      },
      {
        title: 'Title of the task',
        description: 'Descripton of the task'
      },
      {
        title: 'Other title of the task',
        description: 'Other descripton of the task'
      }
    ]

    this.impTasks = [
      {
        title: 'Title of the task',
        description: 'Descripton of the task'
      },
      {
        title: 'Other title of the task',
        description: 'Other descripton of the task'
      }
    ]
  }

  toggleTasks(taskBox: any) {
    if(taskBox.style.display == 'block' || taskBox.style.display == ''){
      taskBox.style.display = 'none';
    }else{
      taskBox.style.display = 'block';
    }
  }

}
