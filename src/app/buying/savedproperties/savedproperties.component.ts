import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property/property.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../services/userservice/user.service';
import { AppConstant } from 'src/app/appconstant';

declare let swal: any;
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-savedproperties',
  templateUrl: './savedproperties.component.html',
  styleUrls: ['./savedproperties.component.scss']
})
export class SavedpropertiesComponent implements OnInit {

  savedpropertylist: any = [];
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
    this.getsavedproperties();
  }

  getsavedproperties() {
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
    this.userservice.getusersavedproperties(userId)
      .subscribe(res => {
        this.savedpropertylist = res;
        //  console.log("res->",res);
        console.log(this.savedpropertylist)
        this.loading = false;
        if (this.savedpropertylist.length <= 6) {
          this.paginination = false;
        }
        else {
          this.paginination = true;
        }
        if (this.savedpropertylist.length == 0) {
          this.emptyMessage = "No Properties Founds";
        }
      },
        (err) => {
          // console.log('Err' + err.error());
        });
  }

  ngOnInit() {
    window.scrollTo(0, 0);

  }

}
