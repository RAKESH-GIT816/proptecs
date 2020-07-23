import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/appconstant';

declare var $: any;

@Component({
  selector: 'app-promoteemail',
  templateUrl: './promoteemail.component.html',
  styleUrls: ['./promoteemail.component.scss']
})
export class PromoteemailComponent implements OnInit {

  LINKURL=AppConstant.APPLICATIONURL

  loading: boolean = false;
  constructor(private route:ActivatedRoute,private router:Router) { }
  propertyId:any;
  walletid:any;
  propertyurl:any
  ngOnInit() {

    
    this.route.paramMap
    .subscribe(param => {
      let id = +param.get('id');
      
      this.propertyId = id;

      this.propertyurl=this.LINKURL+"ViewProperty/"+id;
      
    });
    window.scrollTo(0, 0);

  }

  save()
  {
    $('#promoteemail').modal('show');

  }
  goToDashboard(){
    this.router.navigate(['/mydashboard/Selling/history'])
  }

}
