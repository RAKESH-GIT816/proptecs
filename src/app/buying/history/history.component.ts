import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property/property.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../services/userservice/user.service';
import { AppConstant } from 'src/app/appconstant';


declare let swal: any;
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  buyerhistorylist: any = [];
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
    this.getbuyer();
  }

  getbuyer() {
    this.loading = true;
    this.paginination = false;
    var userId = 0;
    // if(this.userdetails!=null)
    // {
    //   userId = this.userdetails.Id;
    // }
    // else{
    //   this.userservice.logout();
    // }
    this.userservice.getbuyerhistory(userId)
      .subscribe(res => {
        this.buyerhistorylist = res;
        this.loading = false;
        if (this.buyerhistorylist.length <= 6) {
          this.paginination = false;
        }
        else {
          this.paginination = true;
        }
        if (this.buyerhistorylist.length == 0) {
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
