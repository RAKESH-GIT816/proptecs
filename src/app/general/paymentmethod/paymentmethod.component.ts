import { Component, OnInit } from "@angular/core";
import { PropertyService } from "../../services/property/property.service";

import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { User, UserWallet } from "../../_models/index";
import { UserService } from "src/app/services/userservice/user.service";
import { environment } from "./../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
declare let swal: any;
declare var jquery: any;
declare var $: any;
declare var Stripe: any;
@Component({
  selector: "app-paymentmethod",
  templateUrl: "./paymentmethod.component.html",
  styleUrls: ["./paymentmethod.component.scss"],
})
export class PaymentmethodComponent implements OnInit {
  userdetails: any;
  propertyDetail: any;
  currentUser: User;
  propertyId: number;
  bidvalue: any;
  style: string;
  wallet: UserWallet;
  userwallet: UserWallet[] = [];
  validCard: boolean;
  cardnumberentered: boolean;
  response: any;
  searchResult: any;
  walletid: any;
  token: any;
  loading1: boolean = false;
  loading: boolean = false;
  hasErrorMesage: boolean = false;
  hasMessage: boolean = false;
  displayMessage: string;
  PrimaryCard:boolean=false;
  userwalletinfo: any;
  Months = ['01', '02', '03', '04', '05', '06', '07', '08', '09','10','11','12'];
  Years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028','2029','2030','2031','2032','2033'];

  constructor(
    private propertyervice: PropertyService,
    private userservice: UserService,
    private router: Router,
    private actrouter: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.userdetails = JSON.parse(localStorage.getItem("UserDetails"));
    this.currentUser = JSON.parse(localStorage.getItem("UserDetails"));
    this.wallet = new UserWallet();

    this.getuserwallet();

  }

  ngOnInit() {
    this.actrouter.params.subscribe((params) => {
      // console.log(params);
      this.propertyId = params.id;
      this.bidvalue = params.bidvalue;
    });
    window.scrollTo(0, 0);
  }
  numberOnly(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
  }
   handleChange() {
  
    this.cardnumberentered = this.num != null || this.num != "" ? true : false;
    this.type = this.getType();
    this.validCard = this.isValid();
  }

  async addcard() {
    console.log(this.PrimaryCard)
    this.loading = true;
    this.hasErrorMesage = this.hasMessage = false;
    this.displayMessage = null;
    Stripe.setPublishableKey(environment.cardToken);
    await Stripe.card.createToken(
      {
        number: parseInt(this.num),
        exp_month: this.wallet.ExpMonth,
        exp_year: this.wallet.ExpYear,
        name: this.wallet.AccountName,
      },
      this.stripeResponseHandler
    );
  }
  stripeResponseHandler=(status, response)=> {
    // this.wallet.AccountNumber = this.num;
    // this.wallet.CardType = this.type;
    // this.wallet.UserId = this.currentUser.Id;
    if (response) {
      response.id;

      let reqObj = {
        Token: response.id,
        LastDigits: response.card.last4,
        ExpiryMonth: response.card.exp_month,
        ExpiryYear: response.card.exp_year,
        NameOnCard: response.card.name,
        CardType: response.card.brand,
        IsPrimary:this.PrimaryCard
      };
      console.log(reqObj);
      this.userservice.saveUserWalletInfo(reqObj).subscribe(res => {
        this.toastr.success('Card saved Successfully!');
        this.response = res;
        this.displayMessage = "Card saved Successfully!";
         $('#addCardModal').modal('hide');
        this.loading = this.hasErrorMesage = false;
       
        this.hasMessage = true;
        window.scrollTo(0, 0);
        this.getuserwallet();
       
      },
        (err) => {
          this.displayMessage = err;
          this.loading = this.hasMessage = false;
          this.hasErrorMesage = true;
          window.scrollTo(0, 0);
        });
    
    }
    
  }
  num: any = "";
  type: string = "default";
  useLuhn: boolean = true;
  _cards: any = {
    amex: {
      prefix: /^3[47]/,
      size: [15],
    },
    dinersclub: {
      prefix: /^(3[6-9]|30([0-5]|9))/,
      size: [14, 16],
    },
    discover: {
      prefix: /^(6(5|011|4[4-9]|22))/,
      size: [16],
    },
    jcb: {
      prefix: /^(35|1800|2131)/,
      size: [15, 16],
    },
    maestro: {
      prefix: /^(50(18|20|38)|58|6(304|7)|0604)/,
      size: [12, 19],
    },
    mastercard: {
      prefix: /^5[1-5]/,
      size: [16],
    },
    unionpay: {
      prefix: /^62/,
      size: [16, 19],
      luhn: false,
    },
    visa: {
      prefix: /^4/,
      size: [13, 16],
    },
    default: {
      prefix: /^\d{1,4}/g,
      size: [13, 19],
    },
  };

  _luhnlookup: any = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

  getType() {
    for (var c in this._cards) {
      if (this.num.match(this._cards[c].prefix)) {
        if ("luhn" in this._cards[c]) {
          this.useLuhn = this._cards[c].luhn;
        }
        this.type = c;
        break;
      }
    }
    return this.type;
  }

  isValid() {
    var len = this._cards[this.getType()].size;

    if (this.num.length >= len[0] && this.num.length <= len[len.length - 1]) {
      return this.useLuhn ? this._luhnCheck() : true;
    }

    return false;
  }

  _luhnCheck() {
    var sum = 0,
      i = this.num.length,
      odd = true;

    while (i--) {
      sum += (odd = !odd)
        ? this._luhnlookup[this.num.charAt(i)]
        : this.num.charAt(i) | 0;
    }
    return sum % 10 == 0;
  }

  confirmprofilestep1() {
    this.router.navigate([
      "confirmprofile/" + this.propertyId + "/" + this.bidvalue,
    ]); //pass dynamic value
  }

  confirmbidstep3() {
    this.router.navigate([
      "confirmbid/" +
        this.propertyId +
        "/" +
        this.bidvalue +
        "/" +
        this.walletid,
    ]); //pass dynamic value
  }

  getuserwallet() {
    this.loading1 = true;
    this.userservice.Getuserwallet().subscribe(
      (data) => {
        this.userwalletinfo=[];
        setTimeout(function () {
         
       }, 20);
       this.loading1 = false;
       this.userwalletinfo = data;
         

        // if (this.userwalletinfo.length > 0) {
        //   this.userwalletinfo[0].IsPrimary = true;
        //   this.walletid = this.userwalletinfo[0].Id;
        // }
      },
      (err) => console.log(err)
    );
  }

  update_primary(data, id) {
    for (var i = 0; i < this.userwalletinfo.length; i++) {
      if (this.userwalletinfo[i].IsPrimary == true) {
        this.userwalletinfo[i].IsPrimary = false;
      }
    }
    if (data) {
      this.userwalletinfo[id].IsPrimary = false;
    } else {
      this.userwalletinfo[id].IsPrimary = true;
    }
    for (var f = 0; f < this.userwalletinfo.length; f++) {
      if (this.userwalletinfo[f].IsPrimary == true) {
        this.walletid = this.userwalletinfo[f].Id;
      }
    }
  }
  deleteCard(id){
this.userservice.deleteUserWalletInfo(id).subscribe(
  (data) => {
    this.getuserwallet();
    this.toastr.success('Card Deleted');
  },
  (err) => 
  this.toastr.error(err)
);
  }
  dismissmodal() {
    $("#addCardModal").modal("toggle");
  }
}
