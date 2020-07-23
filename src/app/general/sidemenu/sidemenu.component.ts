import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  userdetails:any;
  constructor() {
    this.userdetails = JSON.parse( localStorage.getItem("UserDetails")) ;
// console.log(this.userdetails)
   }

  ngOnInit() {
  }

}
