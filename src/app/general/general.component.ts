import { Component, OnInit, Input } from '@angular/core';
import { PropertyService } from '../services/property/property.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AppConstant } from '../appconstant';
import { EventEmitter } from 'events';
import { UserService } from '../services/userservice/user.service';

declare let swal: any;
declare var jquery: any;
declare var $: any;
declare function openForm() : any;

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css','./general.component.scss']
})
export class GeneralComponent implements OnInit {

  properties: any = [];
  userdetails: any
  loading: boolean
  paginination: boolean
  checklogout: any

  public footevent: EventEmitter = new EventEmitter();

  constructor(
    private propertyservice: PropertyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public userservice: UserService

  ) {
    //this.userdetails = JSON.parse( localStorage.getItem("UserDetails")) ;

    document.body.className = "theme-red sign-up"
    this.getproperties();
  }
  message: string;

  checklogin() {
    this.getproperties();

    this.someMethod()
    
    
  }

  someMethod() {
    
  }

  getproperties() {
     this.userdetails = JSON.parse(localStorage.getItem("UserDetails"));


    this.loading = true;
    this.paginination = false;
    var userId = 0;
    // if (this.userdetails != null) {
    //   userId = this.userdetails.Id;
    // }

    let reqObj={
      'city':"a",
      'state':"b",
      'zipcode':"c",
      'searchtext':"d"
    }
    this.propertyservice.searchProperties(reqObj)
      .subscribe(res => {
        this.properties = res;
        console.log(this.properties)
        this.loading = false;
        this.paginination = true;
      },
        (err) => {
        });

  }

  ngOnInit() {
    window.scrollTo(0, 0);

  }

  saveProperty(propId) {
     var userId = 0;
    if (this.userdetails != null) {
      userId = this.userdetails.Id;
      this.propertyservice.saveFavProperty(propId,userId)
        .subscribe(res => {
          this.getproperties()
        },
          (err) => {
          });
     }
    else {
      openForm();
    }

  }

  unsaveProperty(propId) {
    var userId = 0;
    if (this.userdetails != null) {
     userId = this.userdetails.Id;
      this.propertyservice.unsaveFavProperty(propId,userId)
        .subscribe(res => {
          this.getproperties()
        },
          (err) => {
          });
     }
    else {
      openForm();
    }
  }

  gotoAllproperties(){
    this.router.navigate(['/viewallproperties']);
  }
}
