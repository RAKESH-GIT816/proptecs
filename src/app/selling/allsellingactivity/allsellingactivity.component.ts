import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property/property.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../services/userservice/user.service';
import { AppConstant } from 'src/app/appconstant';

declare let swal: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-allsellingactivity',
  templateUrl: './allsellingactivity.component.html',
  styleUrls: ['./allsellingactivity.component.scss']
})
export class AllsellingactivityComponent implements OnInit {
  sellerallactivity: any = [];
  userdetails: any
  loading: boolean
  paginination: boolean;
  emptyMessage: string = "";
  Noofbids: any = [];
  IsnofoBids: any;


  constructor(
    private propertyservice: PropertyService, private userservice: UserService,
    private router: Router

  ) {
    this.userdetails = JSON.parse(localStorage.getItem("UserDetails"));
    document.body.className = "theme-red sign-up"
    this.getsellerallactivity();
  }

  getsellerallactivity() {
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
    this.propertyservice.getselleractiveproperties(userId)
      .subscribe(res => {
        this.sellerallactivity = res;
        this.loading = false;
        if (this.sellerallactivity.length <= 6) {
          this.paginination = false;
        }
        else {
          this.paginination = true;
        }
        if (this.sellerallactivity.length == 0) {
          this.emptyMessage = "No Properties Founds";
        }
      },
        (err) => {
        });

  }

  getnoofBids(propertyId) {
    // alert(propertyId)
    this.propertyservice.getnoofbids(propertyId).subscribe(res => {
      this.Noofbids = res;
      this.IsnofoBids = this.Noofbids.userProfileImageURL;
      console.log(this.Noofbids)
    })
  }


  ngOnInit() {
    window.scrollTo(0, 0);

  }

}
