import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property/property.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../services/userservice/user.service';
import { AppConstant } from 'src/app/appconstant';

declare let swal: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-bidsaccepted',
  templateUrl: './bidsaccepted.component.html',
  styleUrls: ['./bidsaccepted.component.scss']
})
export class BidsacceptedComponent implements OnInit {

  bidsacceptedlist: any = [];
  userdetails: any
  loading: boolean
  paginination: boolean;
  emptyMessage: string = "";

  constructor(
    private propertyervice: PropertyService, private userservice: UserService,
    private router: Router

  ) {
    this.userdetails = JSON.parse(localStorage.getItem("UserDetails"));
    document.body.className = "theme-red sign-up"
    this.getaccepttedbids();
  }

  getaccepttedbids() {
    this.loading = true;
    this.paginination = false;
    var userId = 0;
    // if (this.userdetails != null) {
    //   userId = this.userdetails.Id;
    // }
    // else {
    //   this.userservice.logout();
    // }
    this.userservice.getacceptedbids(userId)
      .subscribe(res => {
        this.bidsacceptedlist = res;
        this.loading = false;
        //   if (this.activebidslist.length <=6){
        //     this.paginination = false;
        //   }
        //   else{
        //   this.paginination=true;
        // }
        //   if (this.activebidslist.length ==0){
        //   this.emptyMessage= "No Properties Founds";
        //   }
        if (this.bidsacceptedlist.length <= 6) {
          this.paginination = false;
        }
        else {
          this.paginination = true;
        }
        if (this.bidsacceptedlist.length == 0) {
          this.emptyMessage = "No Properties Founds";
        }
      },
        (err) => {

        });


  }

  ngOnInit() {
    window.scrollTo(0, 0);

  }

}
