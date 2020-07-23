import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property/property.service'
import { Router, NavigationExtras, ActivatedRoute, } from '@angular/router';
import { AppConstant } from '../../appconstant';
import { UserService } from 'src/app/services/userservice/user.service';



declare let swal: any;
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-bidproperty',
  templateUrl: './bidproperty.component.html',
  styleUrls: ['./bidproperty.component.scss']
})
export class BidpropertyComponent implements OnInit {

  loading: boolean = false;
  propertyId: any
  userdetails: any
  propertyDetail: any
  bidvalue: number
  askingPrice: any
  bidAmountValid = true
  CurUserid = 0;

  propertyparams = "bidproperty"

  constructor(
    private propertyervice: PropertyService,
    private router: Router,
    private actrouter: ActivatedRoute,
    private userservice: UserService
  ) {
    this.userdetails = JSON.parse(localStorage.getItem("UserDetails"));


    if (this.userdetails) {
      this.CurUserid = this.userdetails.Id
    }


    this.actrouter.params.subscribe(params => {
      this.propertyId = params.id;

    });
    this.getPropertyDetailsForBid(this.propertyId);

  }

  ngOnInit() {

    this.propertyDetail = {}
    window.scrollTo(0, 0);

  }

  getPropertyDetailsForBid(propertyId) {
    this.loading = true
    var userId = 0;
    if (this.userdetails != null) {
      userId = this.userdetails.Id;
    }
    this.propertyervice.getPropertyDetailsForBid(propertyId, userId)
      .subscribe(res => {
        this.propertyDetail = res;
        console.log(this.propertyDetail)
        if (this.propertyDetail.BidAmount != null) {
          this.bidvalue = this.propertyDetail.BidAmount;
          this.askingPrice = this.propertyDetail.BidAmount;
        } else {
          this.bidvalue = this.propertyDetail.MinimumStartBid;
          this.askingPrice = this.propertyDetail.MinimumStartBid;
        }

        this.loading = false

      },
        (err) => {

        });


  }

  submitabid() {
    let walletid = 0;
    // console.log(this.actrouter.snapshot.params)
    if (this.actrouter.snapshot.params.mode == 'bidIncrease') {
      // console.log(JSON.parse(localStorage.getItem('UserDetails')).Id)
      // this.userservice.Getuserwallet(JSON.parse(localStorage.getItem('UserDetails')).Id).subscribe(data => {
      //    console.log(data)
      //   if(data["length"]>0)
      //     {
      //     walletid=data[0].Id;
      //     this.router.navigate(['confirmbid/' + this.propertyId + '/' + this.bidvalue + '/' + walletid]);
      //     }
      //     else{
      //       alert("no walletId found for this Property.")
      //     }       
      //   }, err => console.log(err)
      // )
      this.router.navigate(['confirmbid/' + this.propertyId + '/' + this.bidvalue + '/' + walletid]);
    } else {
      this.router.navigate(['/confirmprofile/' + this.propertyId + '/' + this.bidvalue]);
    }
  }

  onKeydown(event) {
    let acceptedKeys: any = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'Delete']
    if (isNaN(event.key) && !acceptedKeys.some(x => x === event.key)) {
      return false;
    }
    if (event.key === "ArrowDown") {
      this.decreaseAmount();
    }
    if (event.key === "ArrowUp") {
      this.increaseAmount();
    }
    this.checkAmount();
  }
  increaseAmount() {
    if (this.bidvalue == 0) { 
      return false;
    }
    else {
      var n: number = 100
      this.bidvalue = parseInt(this.bidvalue + "") + 100;
      this.checkAmount();
    }
  }
  decreaseAmount() {
    if (this.bidvalue == 0 || this.bidvalue <= 100) {
      return false;
    } else {
      this.bidvalue = this.bidvalue - 100;
      this.checkAmount();
    }
  }
  checkAmount() {
    this.propertyDetail.WholequityFee = (this.propertyDetail.MinimumStartBid * 0.01 > 700) ? this.propertyDetail.MinimumStartBid * 0.01 : 700;
    if ((this.askingPrice - this.bidvalue) % 100 === 0) {
      this.bidAmountValid = true;
    } else {
      this.bidAmountValid = false;
    }
  }
}
