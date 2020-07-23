import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property/property.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../services/userservice/user.service';
import { AppConstant } from 'src/app/appconstant';

declare let swal: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-sellhistory',
  templateUrl: './sellhistory.component.html',
  styleUrls: ['./sellhistory.component.scss']
})
export class SellhistoryComponent implements OnInit {

  sellerhistorylist: any = [];
  userdetails: any
  loading: boolean
  paginination: boolean;
  emptyMessage: string = "";
  // showEdit: boolean;

  constructor(
    private propertyervice: PropertyService, private userservice: UserService,
    private router: Router

  ) {
    this.userdetails = JSON.parse(localStorage.getItem("UserDetails"));
    document.body.className = "theme-red sign-up"
    this.getseller();
  }

  getseller() {
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
    this.propertyervice.getsellerhistory(userId)
      .subscribe(res => {
        //this.bidsacceptedlist = res;       
        this.sellerhistorylist = res;
        console.log(this.sellerhistorylist)
        // this.showEdit = !this.showEdit;
        this.loading = false;
        if (this.sellerhistorylist.length <= 6) {
          this.paginination = false;
        }
        else {
          this.paginination = true;
        }
        if (this.sellerhistorylist.length == 0) {
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
