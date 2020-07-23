import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {AppConstant} from '../../appconstant'
import { User, UserWallet } from '../../_models/index';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiendpoint:any
   registerUrl: any
   loginUrl:any
   SavewalletUrl:any
   DeletewalletUrl:any
   getUserUrl:any
   putUserDetails:any
   BitProperty:any;
   GetactivebidsUrl:any;
   UpdateEmail:any;
   UpdatePassword:any;
   GetUserSavedProperties:any;
   GetBuyerHistory:any;
   GetAcceptedBids:any;
   MobileverifyUrl:any;
   checklogout=0;
  constructor(private http: HttpClient, private router: Router) {
    this.apiendpoint = AppConstant.API_ENDPOINT;
     this.registerUrl = AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.REGISTER;
     this.loginUrl = AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.Login;
     this.SavewalletUrl=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.SAVEWALLET;
     this.DeletewalletUrl=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.DELETEWALLET;
     this.getUserUrl=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.GETUSERBYID;
     this.putUserDetails=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.PUTUSERDETAILS;
     this.BitProperty=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.BIDPROPERTY;
     this.GetactivebidsUrl=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.ACTIVEBIDS;
     this.UpdateEmail=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.UPDATEEMAIL;
     this.UpdatePassword=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.UPDATEPASSWORD;
     this.GetUserSavedProperties=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.GETUSERSAVEDPROPERTIES;
     this.GetBuyerHistory=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.GETBUYERHISTORY;
     this.GetAcceptedBids=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.ACCEPTEDBIDS;
     this.MobileverifyUrl=AppConstant.API_ENDPOINT+AppConstant.API_URL.USER.VERIFYMOBILE;

   }


  userRegister(data: any) {    
    var temp : any ={
      'EmailAddress': data.EmailAddress,
      'password': data.password
    };
    return this.http.post(this.registerUrl,temp)
  }
  userLogin(data: any) {    
    return this.http.post(this.loginUrl,data)
    .pipe(tap(res => this.setSession(res)))
  }
  public isLoggedIn() : boolean {
    return !!localStorage.getItem('token');
  }
  private setSession(res) {
    localStorage.setItem('token', res.Token);
    localStorage.setItem('UserDetails',JSON.stringify(res));
  }

  saveUserWalletInfo(wallet) {
    return this.http.post(this.SavewalletUrl , wallet);
  }

  deleteUserWalletInfo(Id: any) {
    const options = {
		  headers: new HttpHeaders({
		    'Content-Type': 'application/json',
		  }),
		  body: {
		    cardId: Id
		  },
		};
	    return this.http.delete(this.DeletewalletUrl, options)
  }

  getUser(data:any)
  {
    const params = new HttpParams().set('userId', data)

   return this.http.get(this.getUserUrl,{params});
  
  }

  PutUserdata(data: any) {    
    return this.http.put(this.putUserDetails,data)
  }


  Getuserwallet() {    
    return this.http.get(environment.API_ENDPOINT+"u/gupc"); 
  }

  PostBidproperty(data: any) {    
    return this.http.post(this.BitProperty,data)
  }

  getactivebids(userid:any){
    const params = new HttpParams()
     return this.http.get(this.GetactivebidsUrl, { params });
  }

  getusersavedproperties(userid:any){
    const params = new HttpParams()
    //  .set('userId', "18");
     return this.http.get(this.GetUserSavedProperties, { params });
  }  
  getbuyerhistory(userid:any){
    const params = new HttpParams()
     //.set('userId', "18");
     return this.http.get(this.GetBuyerHistory, { params });
  }  
  getacceptedbids(userid:any){
    const params = new HttpParams()
     //.set('userId', "18");
     return this.http.get(this.GetAcceptedBids, { params });
  }   
  Updateemail(data)
  {
    return this.http.put(this.UpdateEmail,data)

  }

  Updatepassword(data)
  {
    return this.http.put(this.UpdatePassword,data)

  }

  logout() {
    
    localStorage.clear();
    this.router.navigate(['/']);
  
    return "0";
}

verifymobile(number,country,uid):Observable<any> {  
 let formdata = {
    number:number ,
    country: country,
    userId: uid,
  };

    return this.http.post ('https://equityone.azurewebsites.net/api/mobile/verify?number='+number+'&country='+country+'&userId='+uid+'',formdata);
}

  verifyotp(code,number,countryid,userid):Observable<any>
  {

    let formdata = {
      code:code,
      number:number ,
      country: countryid,
      userId: userid,
    };
    return this.http.post ('https://equityone.azurewebsites.net/api/mobile/validatecode?requestId=undefined&code='+code+'&number='+number+'&country='+countryid+'&userId='+userid+'',formdata);
    
  }

}
