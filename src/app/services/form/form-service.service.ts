import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
// import { Http } from '@angular/http';
// import * as _ from "underscore";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  getFormErrorMessage(formGroupObj: FormGroup, errorObj: any) {
    for (let i in formGroupObj.controls) {
      var formControlObj = formGroupObj.controls[i];
      if (formControlObj instanceof FormControl) {
        if (formControlObj.errors) {
          return errorObj[i][Object.keys(formControlObj.errors)[0]];
        }
      }
    }
  }

  constructor() { }
}
