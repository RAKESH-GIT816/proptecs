import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  userdetails:any;
  checklogout:any;
  sellproperties:any;
  constructor() {

    this.sellproperties="sell_login"

    this.userdetails = JSON.parse( localStorage.getItem("UserDetails")) ;

    if(this.userdetails){
     this.checklogout=1;
   
    }
    else{
      this.checklogout=0;
      
    }

    

   }
  current_year:any;
  ngOnInit() {
    this.current_year=new Date();
  }



}
