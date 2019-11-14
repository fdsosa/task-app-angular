import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
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
  updateID: string = null;

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
        res => {this.listTasks(res);
        console.log(res)},
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
      id: null,
      username: this.username,
      title: this.controls.title.value,
      description: this.controls.desc.value,
      type: this.controls.type.value
    } 
    console.log(this.taskForm.controls)

    if(this.updateID != null){

      console.log('UPDATE' + this.updateID)
      //UPDATE TASK
      this.taskService.editTask(this.updateID, this.taskModel)
      .subscribe(
        res => { this.updateTaskItem(res, this.taskModel)},
        err => {console.log(err)}
      )

      this.updateID = null;
      this.taskForm.reset();

    }else{
      console.log('CREATE')

      //CREATE TASK
      this.taskService.createTask(this.taskModel)
      .subscribe(
        res => {this.addTaskList(res)},
        err => {console.log(err)}
      );

      this.taskForm.reset();

    }
  }

  //LIST TASKS
  listTasks(tasks) {
    this.tasks = [];
    this.impTasks = [];

    for(let i = 0; i < tasks.length; i++){
      if(tasks[i].type == 'Normal') {
        this.tasks.push(tasks[i])
      } else {
        this.impTasks.push(tasks[i])
      }
    }
  }

  //UPDATE ITEM VIEW
  updateTaskItem(oldTask, newTask) {
    if( oldTask.type == 'Normal' ) {
      //IF NORMAL TASK
      for(let i = 0; i < this.tasks.length; i++) {
        if(oldTask._id == this.tasks[i]._id) {
          this.tasks[i].title = newTask.title;
          this.tasks[i].description = newTask.description;
        }
      }
    } else {
      //IF IMPORTANT TASK
      for(let i = 0; i < this.impTasks.length; i++) {
        if(oldTask._id == this.impTasks[i]._id) {
          this.impTasks[i].title = newTask.title;
          this.impTasks[i].description = newTask.description;
        }
      }
    }
  }

  //ADD TASK TO LIST(VIEW)
  addTaskList(task) {
    if(task.type == 'Normal') {
      this.tasks.push(task)
    } else {
      this.impTasks.push(task)
    }
  }

  //EDIT BUTTON FUNCTION
  editThis(task) {
    this.updateID = task._id;

    this.taskForm.controls['title'].setValue(task.title);
    this.taskForm.controls['desc'].setValue(task.description);
    this.taskForm.controls['type'].setValue(task.type);
  }

  //DELETE BUTTON FUNCTION
  deleteThis(task) {
    console.log(task);
    this.taskService.deleteTask(task._id)
      .subscribe(
        res => {console.log(res)},
        err => {console.log(err)}
      )

    if(task.type == 'Normal') {
      let index = this.tasks.indexOf(task);
      this.tasks.splice( index, 1 )
    } else {
      let index = this.impTasks.indexOf(task);
      this.impTasks.splice( index, 1 )
    }  
  }

  // convenience getter for easy access to form fields
  get controls() { return this.taskForm.controls }

  //TOGGLE TASKS FUNCTION
  toggleTasks(taskBox: any) {
    if(taskBox.style.display == 'block' || taskBox.style.display == ''){
      taskBox.style.display = 'none';
    }else{
      taskBox.style.display = 'block';
    }
  }
}
