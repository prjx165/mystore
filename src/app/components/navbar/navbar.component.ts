import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  public index:number=1;

  clickHandler(index:number){
    this.index = index;
  }


  logoutHandler(){
    this.router.navigateByUrl('login');
  }

  ngOnInit(): void {
  }

}
