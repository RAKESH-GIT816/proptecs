import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form/form-service.service';
import { UserService } from '../../services/userservice/user.service'
declare let swal: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  submitted : any;
  loginsts : any;
  errMsg:any;

  constructor(
    private fb: FormBuilder,
    private formservice: FormService,
    private userservice: UserService,
    private router: Router,
    private acrouter:ActivatedRoute
  ) {
      document.body.className = "theme-red sign-up",
      this.login = fb.group({
        'EmailAddress': [null, [Validators.required,Validators.email]],
        'password': [null, Validators.required],
        'remeberme': [null]
      });
   }

   formObj: any = {
    EmailAddress: {
      required: "Email Address Required",
    },
    password: {
      required: "password Required"
    },
  }
  

  get f() {
    return this.login.controls; 
  }
  loginform(data) {

    this.submitted = true;
    if (this.login.invalid) {
      return;
    }

    if (this.login.status == "INVALID") {
      var errorMessage = this.formservice.getFormErrorMessage(this.login, this.formObj);
         return false;
    }
    if (data) {
      var btn = $('#loadbtn')
      btn.button('loading')
      var formdata =
      {
        EmailAddress: data.EmailAddress,
        password: data.password
      }
      
      this.userservice.userLogin(formdata)
        .subscribe(res => {
          btn.button('reset');
           localStorage.setItem("token", JSON.stringify(res));
          if(this.urlprams=="sell_login")
          {
            this.router.navigate(['/propertydetails/new']);                   
          }else if (this.urlprams=="bidproperty")
          {
            this.router.navigate(['/bidproperty',this.uid]);                   
            
          }
          else{
            this.router.navigate(['mydashboard/Buying/activebids']);                   
          }
        },
          (err) => {
            btn.button('reset')
   
           this.loginsts=false;
           this.errMsg=err.error.message;
          });
    }
  }
  uid:any;

  urlprams:any

  ngOnInit() {    

    this.acrouter.params.subscribe(params => {
      
      this.uid = params.id;
      this.urlprams = params.urlparamss;
      
    });

    window.scrollTo(0, 0);

    
  }

  logout(){    
    localStorage.removeItem("token");
    this.router.navigate(['/']);    
  }

}
