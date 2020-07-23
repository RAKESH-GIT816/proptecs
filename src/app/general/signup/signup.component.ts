import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { FormService } from '../../services/form/form-service.service';
import { UserService } from '../../services/userservice/user.service'
import Swal from 'sweetalert2'
declare var $: any;

import { from } from 'rxjs';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
// declare var $: any;
// declare var jquery: any;
// declare let swal: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted
  checkpassword:any;
  Emailcheck=true;
  errMsg:any
  constructor(
    private fb: FormBuilder,
    private userservice: UserService,private router : Router,
    private formservice: FormService) {
    document.body.className = "theme-red sign-up",
      this.registerForm = fb.group({
        'EmailAddress': [null, [Validators.required, Validators.email]],
        'password': [null, [Validators.required,  Validators.minLength(6), Validators.maxLength(20)]],
        'cpassword': [null, [Validators.required ]]
      })
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

  get f() {
    return this.registerForm.controls; 
  }

  onsignup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.status == "INVALID") {
      var errorMessage = this.formservice.getFormErrorMessage(this.registerForm, this.formObj);
     // swal.fire('', errorMessage, 'warning');
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
            },
            err => {
              //alert ("errr") ;    
              console.log('error', err)
             // swal.fire('Oops...', err.error.message, 'warning');
              this.errMsg=err.error.message
              this.Emailcheck=false
              //this.registerForm.reset();
              btn.button('reset');
            }
          );
      }
     
    }
  }


  checkPasswords(password, cpassword) {

    if (password == cpassword)
    {
      this.checkpassword=true
      return true

    } 
    else
    {
      this.checkpassword=false
      
      return false

    }
  }
  
  ngOnInit() {
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

  dismissmodal()
  {
    this.router.navigate(['/']);
  }

}
