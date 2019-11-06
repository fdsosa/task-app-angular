import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  token: boolean = false;
  name: string;

  constructor(public router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('ACCESS_TOKEN')){
      this.token = true;
    }

    if(localStorage.getItem('USER_NAME')) { this.name = localStorage.getItem('USER_NAME') }
  }

  toggleMenu(menu: any){
    (menu.style.display == 'none') ? menu.style.display = 'block' : menu.style.display = 'none';
    
  }

}
