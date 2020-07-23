import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from 'events';
import { AppConstant } from 'src/app/appconstant';
import { PropertyService } from 'src/app/services/property/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
// import {ChangeDetectionStrategy, Input} from "@angular/core";
// import {PaginationInstance} from '../../../../src/ngx-pagination.module';
declare function openForm() : any;

@Component({
  selector: 'app-viewallproperties',
  templateUrl: './viewallproperties.component.html',
  styleUrls: ['./viewallproperties.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewallpropertiesComponent implements OnInit {
  // @Input('data') meals: string[] = [];
  // page: number = 1;
  searchText: any;
  properties: any = [];
  userdetails: any
  loading: boolean
  paginination: boolean
  checklogout: any
  page: number = 1;
  pageSize: number = 3;
  emptyMessage: string = "";
  public footevent: EventEmitter = new EventEmitter();

  constructor(
    private propertyservice: PropertyService,
    private router: Router,
    private activatedRoute: ActivatedRoute

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
    if (this.userdetails != null) {
      userId = this.userdetails.Id;
    }
    let reqObj={
      'city':"a",
      'state':"b",
      'zipcode':"c",
      'searchtext':"d"
    }
    this.propertyservice.searchProperties(reqObj)
    // .subscribe(res => {
    //   this.sellerallactivity = res;
    //   this.loading = false;
    //   if (this.sellerallactivity.length <= 6) {
    //     this.paginination = false;
    //   }
    //   else {
    //     this.paginination = true;
    //   }
    //   if (this.sellerallactivity.length == 0) {
    //     this.emptyMessage = "No Properties Founds";
    //   }
      .subscribe(res => {
        this.properties = res;
        // console.log( this.properties)
        this.loading = false;
        if (this.properties.length <= 60) {
              this.paginination = false;
            }
            else {
              this.paginination = true;
            }
            if (this.properties.length == 0) {
              this.emptyMessage = "No Properties Founds";
            }
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
