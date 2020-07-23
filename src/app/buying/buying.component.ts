import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property/property.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../services/userservice/user.service';
import { AppConstant } from '../appconstant';
import { ThrowStmt } from '@angular/compiler';


declare let swal: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})
export class BuyingComponent implements OnInit {

  activebidslist: any = [];
  userdetails :any
  loading:boolean
  paginination:boolean
  emptyMessage:string ="";
  bidintop: any;

  constructor(
    private propertyervice: PropertyService,private userservice: UserService,
    private router: Router

  ) {
    this.userdetails = JSON.parse( localStorage.getItem("UserDetails")) ;
    document.body.className = "theme-red sign-up"
    this.getactivebids();
  }

  getactivebids() {
    this.loading=true;
    this.paginination=false;
    var userId =0;
    // if(this.userdetails!=null)
    // {
    //   userId = this.userdetails.Id;
    // }else{
    //   this.userservice.logout();
    // }
    this.userservice.getactivebids(userId)
      .subscribe(res => {
        this.activebidslist = res;
        this.bidintop = this.activebidslist.BidAmount;
       console.log(this.activebidslist);        
        this.loading = false;
        if (this.activebidslist.length <=6){
          this.paginination = false;
        }
        else{
        this.paginination=true;
      }
        if (this.activebidslist.length ==0){
        this.emptyMessage= "No Properties Founds";
        }
      },
        (err) => {
         // console.log('Err' + err.error());
        });
  }

  ngOnInit() {
  }

  timeConvert(n) {
  
    var n  : any  = new Date(2019, 12, 2);
    
  //  console.log(n);
    var now = new Date();
    //console.log(now);
    var t = n.parse - now.getTime();;
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    if(days > 0 ){
      return {
        'days': days + 'D ',
        'hours': hours + 'H',
      }
    }
    else
    {
      if(days < 0){
        return {
          'days': Math.abs(days)  + 'D ',
          'hours': Math.abs(hours) + 'H ago',
        }
      }
      else if(hours >= 0 && minutes >= 0 ){
        return {
          'hours': hours + 'H ',
          'minutes': minutes + 'M',
        };  
      }
      else
      {
        return {
          'hours': Math.abs(hours) + 'H ',
          'minutes': Math.abs(minutes) + 'M ago',
        };  
      }
    }
  }
  // ConfirmBids(propertyId){
  //   this.router.navigate(['/bidproperty/ '+ propertyId],{ queryParams: { mode: 'bidIncrease' } });
  // }

}
