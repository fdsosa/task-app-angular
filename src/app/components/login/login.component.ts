import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UserI } from './../../models/user';
import { JwtResponseI } from './../../models/jwt-response';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showErrorBox = false;
  submitted = false;
  loginForm: FormGroup;
  user: UserI;
  loginRes: JwtResponseI;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    console.log('entra');
    this.submitted = true;


    //Control Validation
    if(this.loginForm.invalid){
      return;
    }

     //Create a user model
    this.user = {
      email: this.controls.email.value,
      password: this.controls.password.value,
      id: 0,
      name: ''
    }

    this.authService.login(this.user)
      .subscribe(
        res => { 
          console.log(res);
          this.handleRes(res); 
          this.router.navigateByUrl(`/user/${res.dataUser.name}`)
        },
        err => { this.handleError() }
      )
    
  }

  handleError(){
    this.showErrorBox = true;
  }

  public handleRes(response: JwtResponseI){
    this.loginRes = response;
  }

  get controls(){ return this.loginForm.controls }

}
