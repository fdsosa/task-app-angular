import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TaskI } from '../../models/task';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  taskForm: FormGroup;
  taskModel: TaskI;
  tasks = [];
  impTasks = [];
  submitted = false;
  userReq: object;
  username: string; 
  typeValue: boolean;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      type: ['', Validators.required]
    });

    let dataPer = JSON.parse(localStorage.getItem('USER_NAME'));
    this.userReq = { username: dataPer.username };
    this.username = dataPer.name;

    this.taskService.getTasks()
      .subscribe(
        res => {this.listTasks(res)},
        err => {console.log(err)}
      )
  }

  //FORM FUNCTION
  onSubmit(){
    this.submitted = true;

    //FORM VALIDATION
    if(this.taskForm.invalid){
      return;
    }

    //CREATE A MODEL WITH VALUES    
    this.taskModel = {
      username: this.username,
      title: this.controls.title.value,
      description: this.controls.desc.value,
      type: this.controls.type.value
    } 
    console.log('le envio esto');
    console.log(this.taskModel);


    this.taskService.createTask(this.taskModel)
    .subscribe(
      res => {console.log(res)},
      err => {console.log(err)}
    );

    this.addTaskList(this.taskModel);
    
  }



  toggleTasks(taskBox: any) {
    if(taskBox.style.display == 'block' || taskBox.style.display == ''){
      taskBox.style.display = 'none';
    }else{
      taskBox.style.display = 'block';
    }
  }

  listTasks(tasks) {
    for(let i = 0; i < tasks.length; i++){
      if(tasks[i].type == 'Normal') {
        this.tasks.push(tasks[i])
      } else {
        this.impTasks.push(tasks[i])
      }
    }
  }

  addTaskList(task) {
    if(task.type == 'Normal') {
      this.tasks.push(task)
    } else {
      this.impTasks.push(task)
    }
  }

  // convenience getter for easy access to form fields
  get controls() { return this.taskForm.controls }

}
