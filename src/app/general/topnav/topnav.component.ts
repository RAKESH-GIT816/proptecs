import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/userservice/user.service';
// import { GeneralComponent } from 'src/app/general/general.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form/form-service.service';
import { ToastrService } from 'ngx-toastr';

declare let swal: any;
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css', './topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  userdetails: any;
  checklogout: any;
  sellproperties: any;
  registerForm: FormGroup;
  checkpassword: any;
  Emailcheck = true;
  errMsg: any
  login: FormGroup;
  submitted: any;
  loginsts: any;
  uid: any;
  urlprams: any;
  register:boolean=false;
  createloginflag:boolean=true;
  @Output() loginEvent = new EventEmitter<string>();
  propertyId: string;
  // propertyId: string;

  // registersuccess: boolean =true;

  constructor(private toastr: ToastrService,
    private acrouter: ActivatedRoute, private router: Router, private formservice: FormService, private userservice: UserService, private fb: FormBuilder, ) {
    document.body.className = "theme-red sign-up",
      this.registerForm = fb.group({
        'EmailAddress': [null, [Validators.required, Validators.email]],
        'password': [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        'cpassword': [null, [Validators.required]]
      });
    this.login = fb.group({
      'EmailAddress': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.required],
      'rememberme': [null]
    });
    this.sellproperties = "sell_login"
    this.userdetails = localStorage.getItem("token");
    if (this.userdetails) {
      this.checklogout = 1;

    }
    else {
      this.checklogout = 0;
    }
  }


  formObj: any = {

    EmailAddress: {
      required: "Email Required",
    },
    password: {
      required: "Password  Required"
    },
    cpassword: {
      required: "confirm Password Required"
    }
  }
  formObj1: any = {
    EmailAddress: {
      required: "Email Address Required",
    },
    password: {
      required: "password Required"
    },
  }
  get f1() {
    return this.login.controls;
  }
  get f() {
    return this.registerForm.controls;
  }

  createaccount(){
    this.register=true;
    this.createloginflag=false;
  }
  createlogin(){
    this.createloginflag=true;
    this.register=false;
  }
  
  onsignup() {
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.status == "INVALID") {
      var errorMessage = this.formservice.getFormErrorMessage(this.registerForm, this.formObj);
      return false;
    }
    else {
      if (this.checkPasswords(this.registerForm.value.password, this.registerForm.value.cpassword)) {
        var btn = $('#loadbtn')
        btn.button('loading')
        this.userservice.userRegister(this.registerForm.value)
          .subscribe(
            res => {
              $("#showmodel").modal('show');
              this.toastr.success('Register Successfully!');
              location.reload();
             
            },
            err => {
              console.log('error', err)
              this.errMsg = err;
              this.Emailcheck = false
              btn.button('reset');
            }
          );
      }

    }
  }
  checkPasswords(password, cpassword) {

    if (password == cpassword) {
      this.checkpassword = true
      return true
    }
    else {
      this.checkpassword = false
      return false
    }
  }

  loginform(data) {
    this.submitted = true;
    if (this.login.invalid) {
      return;
    }
    if (this.login.status == "INVALID") {
      var errorMessage = this.formservice.getFormErrorMessage(this.login, this.formObj1);
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
          // localStorage.setItem("UserDetails", JSON.stringify(res));
          // if(this.urlprams=="sell_login")
          // {
          //   this.router.navigate(['/propertydetails/new']);                   
          // }else if (this.urlprams=="bidproperty")
          // {
          //   this.router.navigate(['/bidproperty',this.uid]);                   
          // }
          // else{
          //   this.router.navigate(['mydashboard/Buying/activebids']);                   
          // }
          // if(this.urlprams=="sell_login")
          // {
          //   this.router.navigate(['/propertydetails/new']);                   
          // }
          //  if (this.urlprams=="bidproperty")
          // {
          //   this.router.navigate(['/bidproperty/'+this.uid]);                   
          // }   

          //  if (this.acrouter.snapshot.params.mode == 'bid') {
          //   this.router.navigate(['/bidproperty/'+this.uid]); 
          //  }
          if (this.acrouter.snapshot.params.mode == 'bid') {
            // this.router.navigate(['bidproperty/'+ this.propertyId +'/'+ this.uid]);
            this.router.navigate(['bidproperty/' + this.uid]);
            location.reload();
          }
          else {
            this.router.navigate(['mydashboard/Buying/activebids']);
            this.toastr.success('Login Successfully!');
          }
        },
          (err) => {
            btn.button('reset')
            this.loginsts = false;
            this.errMsg = err;
          });
    }
  }

  ngOnInit() {
    this.acrouter.params.subscribe(params => {
      this.uid = params.id;
      this.urlprams = params.urlparamss;
    });
    window.scrollTo(0, 0);


    $('.overlay').css('display', 'none');

    $.AdminBSB.dropdownMenu = {
      activate: function () {
        var _this = this;

        $('.dropdown, .dropup, .btn-group').on({
          "show.bs.dropdown": function () {
            var dropdown = _this.dropdownEffect(this);
            _this.dropdownEffectStart(dropdown, dropdown.effectIn);
          },
          "shown.bs.dropdown": function () {
            var dropdown = _this.dropdownEffect(this);
            if (dropdown.effectIn && dropdown.effectOut) {
              _this.dropdownEffectEnd(dropdown, function () { });
            }
          },
          "hide.bs.dropdown": function (e) {
            var dropdown = _this.dropdownEffect(this);
            if (dropdown.effectOut) {
              e.preventDefault();
              _this.dropdownEffectStart(dropdown, dropdown.effectOut);
              _this.dropdownEffectEnd(dropdown, function () {
                dropdown.dropdown.removeClass('open');
              });
            }
          }
        });

        //Set Waves
        // Waves.attach('.dropdown-menu li a', ['waves-block']);
        // Waves.init();
      },
      dropdownEffect: function (target) {
        var effectIn = $.AdminBSB.options.dropdownMenu.effectIn, effectOut = $.AdminBSB.options.dropdownMenu.effectOut;
        var dropdown = $(target), dropdownMenu = $('.dropdown-menu', target);

        if (dropdown.length > 0) {
          var udEffectIn = dropdown.data('effect-in');
          var udEffectOut = dropdown.data('effect-out');
          if (udEffectIn !== undefined) { effectIn = udEffectIn; }
          if (udEffectOut !== undefined) { effectOut = udEffectOut; }
        }

        return {
          target: target,
          dropdown: dropdown,
          dropdownMenu: dropdownMenu,
          effectIn: effectIn,
          effectOut: effectOut
        };
      },
      dropdownEffectStart: function (data, effectToStart) {
        if (effectToStart) {
          data.dropdown.addClass('dropdown-animating');
          data.dropdownMenu.addClass('animated dropdown-animated');
          data.dropdownMenu.addClass(effectToStart);
        }
      },
      dropdownEffectEnd: function (data, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        data.dropdown.one(animationEnd, function () {
          data.dropdown.removeClass('dropdown-animating');
          data.dropdownMenu.removeClass('animated dropdown-animated');
          data.dropdownMenu.removeClass(data.effectIn);
          data.dropdownMenu.removeClass(data.effectOut);

          if (typeof callback == 'function') {
            callback();
          }
        });
      }
    }
    $(function () {
      $.AdminBSB.browser.activate();
      $.AdminBSB.leftSideBar.activate();
      $.AdminBSB.rightSideBar.activate();
      $.AdminBSB.navbar.activate();
      $.AdminBSB.dropdownMenu.activate();
      $.AdminBSB.input.activate();
      $.AdminBSB.select.activate();
      $.AdminBSB.search.activate();

      setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
    });
  }

  dismissmodal() {
    this.router.navigate(['/']);
  }
  // logout(){    
  //   localStorage.removeItem("UserDetails");
  //   this.router.navigate(['/']);    
  // }
  logout() {
    this.checklogout = this.userservice.logout();

    this.loginEvent.emit()
  }

}
