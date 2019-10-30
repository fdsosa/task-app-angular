import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JoinModel } from '../../models/join-form';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  joinForm: FormGroup;
  joinModel: JoinModel;
  submitted = false;
  passMatch: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.joinForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pswd: ['', Validators.required],
      confPswd: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;
    //FORM VALIDATION
    if(this.joinForm.invalid){
      console.log(this.controls);
      if(this.controls.pswd.value != this.controls.confPswd.value){
        console.log('no coinciden');
        this.passMatch = false;
      }else{
        console.log('coinciden');
        this.passMatch = true;
      }
      return;
    }

    //MATCH VALIDATION
    if(this.controls.pswd.value != this.controls.confPswd.value){
      console.log('no coinciden');
      this.passMatch = false;
      return;
    }else{
      console.log('coinciden');
      this.passMatch = true;
    }

    //CREATE A MODEL WITH VALUES
    this.joinModel = new JoinModel(
      this.controls.username.value,
      this.controls.email.value,
      this.controls.pswd.value
    )
    
    console.log(this.joinModel)
  }

  // convenience getter for easy access to form fields
  get controls() { return this.joinForm.controls }

}
