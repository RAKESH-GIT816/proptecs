import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userservice/user.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

declare var $: any;


declare let swal: any;

@Component({
  selector: 'app-accountpreferences',
  templateUrl: './accountpreferences.component.html',
  styleUrls: ['./accountpreferences.component.scss']
})
export class AccountpreferencesComponent implements OnInit {

  successmsg=false;
  userform: FormGroup;
  country: any
  loading: boolean = false; 
  newemailvalidation: FormGroup;
  newMobile: any;
  otp: any;
  submitted = false;
  newemailsub = false;
  OldPassword: any;
  NewPassword: any;
  userdetails: any
  NewEmail: any;
  UserValues: any;
  errMsg:any;
  States=[
    { id :'AL',name: 'Alabama'},    
    { id :"AS", name : 'American Samoa'},
     { id :"AZ", name : 'Arizona'},
     { id :"AR", name : 'Arkansas'},
     { id :"CA", name : 'California'},
     { id :"CO", name : 'Colorado'},
     { id :"CT", name : 'Connecticut'},
     { id :"DE", name : 'Delaware'},
     { id :"DC", name : 'District Of Columbia'},
     { id :"FM", name : 'Federated States Of Micronesia'},
     { id :"FL", name : 'Florida'},
     { id :"GA", name : 'Georgia'},
     { id :"GU", name : 'Guam'},
     { id :"HI", name : 'Hawaii'},
     { id :"ID", name : 'Idaho'},
     { id :"IL", name : 'Illinois'},
     { id :"IN", name : 'Indiana'},
     { id :"IA", name : 'Iowa'},
     { id :"KS", name : 'Kansas'},
     { id :"KY", name : 'Kentucky'},
     { id :"LA", name : 'Louisiana'},
     { id :"ME", name : 'Maine'},
     { id :"MH", name : 'Marshall Islands'},
     { id :"MD", name : 'Maryland'},
     { id :'MA', name : 'Massachusetts'},
     { id :'MI', name : 'Michigan'},
     { id :'MN', name : 'Minnesota'},
     { id :'MS', name : 'Mississippi'},
     { id :'MO', name : 'Missouri'},
     { id :'MT', name : 'Montana'},
     { id :'NE', name : 'Nebraska'},
     { id :'NV', name : 'Nevada'},
     { id :'NH', name : 'New Hampshire'},
     { id :'NJ', name : 'New Jersey'},
     { id :'NM', name : 'New Mexico'},
     { id :'NY', name : 'New York'},
     { id :'NC', name : 'North Carolina'},
     { id :'ND', name : 'North Dakota'},
     { id :'MP', name : 'Northern Mariana Islands'},
     { id :'OH', name : 'Ohio'},
     { id :'OK', name : 'Oklahoma'},
     { id :'OR', name : 'Oregon'},
     { id :'PW', name : 'Palau'},
     { id :'PA', name : 'Pennsylvania'},
     { id :'PR', name : 'Puerto Rico'},
     { id :'RI', name : 'Rhode Island'},
     { id :'SC', name : 'South Carolina'},
     { id :'SD', name : 'South Dakota'},
     { id :'TN', name : 'Tennessee'},
     { id :'TX', name : 'Texas'},
     { id :'UT', name : 'Utah'},
     { id :'VT', name : 'Vermont'},
     { id :'VI', name : 'Virgin Islands'},
     { id :'VA', name : 'Virginia'},
     { id :'WA', name : 'Washington'},
     { id :'WV', name : 'West Virginia'},
     { id :'WI', name : 'Wisconsin'},
     { id :'WY', name : 'Wyoming'}
  ] 
  isPhoneNumber: any;

  constructor(private userserive: UserService, private formBuilder: FormBuilder,private toastr: ToastrService,) {
    this.userdetails = JSON.parse(localStorage.getItem("UserDetails"));

    if (this.userdetails == null) {
      this.userserive.logout();
    }
    this.getuserdetails(this.userdetails.Id)
  }

  ngOnInit() {

    
    this.UserValues={}
    this.userform = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern("^ ~0-9!#$%&*()^][ A-Za-z.]*"),]],
      lastName: ['', [Validators.required, Validators.pattern("^ ~0-9!#$%&*()^][ A-Za-z.]*"),]],
      email: ['', [Validators.required, Validators.email]],
      // username: ['', Validators.required],    [^ ~0-9!#$%&*()^][ A-Za-z.]*
      phone: ['', [Validators.required, Validators.pattern("[0-9]*"),]],
      address1: ['', [Validators.required, Validators.pattern("^ ~!$%*()^][ --,#/&_@0-9A-Za-z.]*"),]],
      address2: ['', [Validators.required,Validators.pattern("^ ~!$%*()^][ --,#/&_@0-9A-Za-z.]*"),]],
      city: ['', [Validators.required,Validators.pattern("[^ ~0-9!#$%&*()^][ A-Za-z.]*"),]],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern("[0-9]*"),]],
    });

    this.newemailvalidation = this.formBuilder.group(
      {
        emaillnew: ['', [Validators.required, Validators.email]],
      });
      window.scrollTo(0, 0);

  }
  get f() {
    return this.userform.controls;
  }
  get emailvalidation() {
    return this.newemailvalidation.controls;
  }
  getuserdetails(id) {
    this.loading = true;
    this.userserive.getUser(id).subscribe(
      res => {
        var dataa:any=res
        this.UserValues = dataa;
              console.log(this.UserValues)
              this.isPhoneNumber=this.UserValues.PhoneNumber;
        if (dataa.UserAddresses.length > 0) {
          this.UserValues.Address1 = dataa.UserAddresses[0].Address1;
          this.UserValues.Address2 = dataa.UserAddresses[0].Address2;
          this.UserValues.City = dataa.UserAddresses[0].City;
          this.UserValues.State =dataa.UserAddresses[0].State;
          this.UserValues.ZipCode = dataa.UserAddresses[0].ZipCode;
        }
        
       this.loading = false;
      }, err => console.log(err))
  }
  
  SaveChanges() {
    this.submitted = true;
    if (this.userform.invalid) {
      return;
    }
    if (this.userform.valid) {
      if (this.userform.valid) {
        this.UserValues.UserAddresses = [{ Address1: this.UserValues.Address1, Address2: this.UserValues.Address2, City: this.UserValues.City, State: this.UserValues.State, ZipCode: this.UserValues.ZipCode }];
        this.loading = true;
        this.userserive.PutUserdata(this.UserValues).subscribe(
          data => {
            this.toastr.success('Saved Successfully!');
            this.successmsg=true
            this.errMsg="Saved Changes Successfully..."
            this.loading = false;
          }, err => {
            this.errMsg=err.error.message
          })
      }
    }

  }

  checkpassword= true;
  changepassword(newpassword, oldpassword) {
    this.NewPassword = newpassword
    this.OldPassword = oldpassword
    if (this.OldPassword == this.UserValues.Password) {
      this.UserValues.Password = this.NewPassword
      this.userserive.Updatepassword(this.UserValues).subscribe(
        data => {
        }, err => console.log(err)
      )
    }
    else {
      this.checkpassword=false;
    }
    this.OldPassword = ""
    this.NewPassword = ""
  }
  updateemail(newmail) {
    this.newemailsub = true;
    if (this.newemailvalidation.invalid) {
      return;
    }
    this.UserValues.EmailAddress = this.NewEmail
    this.userserive.Updateemail(this.UserValues).subscribe(
      data => {
        this.UserValues = data;
      }, err => console.log(err)
    )
  }
  number: any;
  countryid: any;

  sendotp(number, country) {
    this.number = number;
    this.countryid = country;
    this.userserive.verifymobile(number, country, this.userdetails.Id).subscribe(
      data => {
        if (data.Success == 1) {
          $("#verifyotpp").modal('show');
        }
      }), err => console.log(err)
  }
  verifyotp(otp) {
    this.otp = otp
    this.userserive.verifyotp(otp, this.number, this.countryid, this.userdetails.Id).subscribe(
      data => {
        if (data.Success == 1) {
          this.UserValues.PhoneNumber = this.number
        }
      }), err => console.log(err)
  }
}
