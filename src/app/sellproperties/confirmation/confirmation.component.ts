import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property/property.service';
import { AppConstant } from 'src/app/appconstant';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  loading: boolean = false; 
  property:any;
  propertydetail:any;
  photosAndVideo:any;
  propertyequity:any;
  supportingDocs:any;
  constructor( private route: ActivatedRoute,  private propertyservice: PropertyService,private router:Router) { }

  ngOnInit() {
  
    this.property={}
    this.propertydetail={}
    this.propertyequity={}
    this.photosAndVideo={}
    this.supportingDocs={}
    
    this.route.paramMap
    .subscribe(param => {
        let id = +param.get('id');
        if (id!=0) {
          this.getPropertyById(id);
        } else {
        }
  });
  window.scrollTo(0, 0);

  }



  getPropertyById(Id: number) {
    this.loading = true;
      this.propertyservice.getPropertyDetails(Id).subscribe(res => {
    console.log(res)
        var  searchResult:any; 
        searchResult=res
            this.property = searchResult;  
            this.propertydetail=this.property.PropertyDetails[0]
            this.propertyequity=this.property.PropertyEquities[0]
             
            this.loading = false;
      },err => console.log(err));
  }
  SaveConfirmation() {
    this.loading = true;

    this.property.Status = 4;
    this.propertyservice.updatePropertyStatus(this.property).subscribe(response => {

      this.loading=false
  
        this.router.navigate(['/propertydetails/listingdetails', this.property.Id]);
  
    });
  }

}
