import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property/property.service'
import { Router, NavigationExtras, ActivatedRoute, } from '@angular/router';
import { UserService } from 'src/app/services/userservice/user.service';
import Swal from 'sweetalert2'
import { AppConstant } from '../../appconstant';

declare let swal: any;
declare var jquery: any;
declare var $: any;



@Component({
  selector: 'app-confirmbid',
  templateUrl: './confirmbid.component.html',
  styleUrls: ['./confirmbid.component.scss']
})
export class ConfirmbidComponent implements OnInit {
  
  loading: boolean = false;
  propertyId: any
  userdetails : any
  propertyDetail:any
 Bidvalue:any
 checkk= false
 submitted=false;
  bidvalue: number;
 
  constructor( 
    private propertyervice: PropertyService,
    private userserive: UserService,
    private router: Router,
    private actrouter: ActivatedRoute) 
    { 
    this.userdetails = JSON.parse( localStorage.getItem("UserDetails")) ;
    this.actrouter.params.subscribe(params => {
    this.propertyId = params.id;
    this.Bidvalue=params.bidvalue;
     
    });
    this.getPropertyDetailsForBid(this.propertyId);
  }
  ngOnInit() {
this.propertyDetail={}
window.scrollTo(0, 0);

  }

  paymentmethodstep2(){
    this.router.navigate(['bidproperty/'+ this.propertyId + '/' + this.Bidvalue]); //pass dynamic value
  }

  Bidpropertyvalue={

    PropertyId:"",
    BidAmount: "",
    WalletId: "1",
    UserId: ""
  }
 
  confirmbid(){
    this.submitted=true;
    if(this.checkk){
    this.Bidpropertyvalue.PropertyId=this.propertyId;
    this.Bidpropertyvalue.BidAmount=this.Bidvalue;
    this.Bidpropertyvalue.UserId=this.userdetails.Id;
    this.userserive.PostBidproperty(this.Bidpropertyvalue).subscribe(
     data => {
         $("#showmodel").modal('show');       

        },err=>console.log(err)) 
 }
else 
{
}

}

  confirmprofilestep1(){
    this.router.navigate(['confirmprofile/7/540000']); //pass dynamic value
  }

  getPropertyDetailsForBid(propertyId){
    
    this.loading = true;
    var userId = 0;
    if (this.userdetails!=null){
      userId = this.userdetails.Id; 
    }
    this.propertyervice.getPropertyDetailsForBid(propertyId,userId)
    .subscribe(res => {
      this.propertyDetail= res;
      console.log(this.propertyDetail)
      // this.bidvalue = this.propertyDetail.BidAmount;
      this.loading = false;         
    },
      (err) => {
            
      });
 
  }

  dismissmodal()
  {
    this.router.navigate(['/mydashboard/Buying/activebids']);
  }


}
