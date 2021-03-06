import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  token: boolean = false;
  name: string;

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit() {
    if(localStorage.getItem('ACCESS_TOKEN')){
      this.token = true;
    }

    if(localStorage.getItem('USER_NAME')) { 
      let data = JSON.parse(localStorage.getItem('USER_NAME'));
      this.name = data.name;
    }
  }

  toggleMenu(menu: any){
    
    if(menu.style.display == "none" || menu.style.display == '') {
      menu.style.display = "block";
    }else{
      menu.style.display = "none";
    }
  
  }

  signout(){
    this.authService.logOut();
    this.router.navigateByUrl('/');
  }

}
