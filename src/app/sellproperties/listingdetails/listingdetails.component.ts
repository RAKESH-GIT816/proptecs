import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property/property.service';
import { MyDatePickerModule,IMyOptions, IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { FileUploader } from 'ng2-file-upload';
import { AppConstant } from 'src/app/appconstant';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

const URL = AppConstant.API_ENDPOINT + 'Property/UploadPropertyDocuments';

@Component({
  selector: 'app-listingdetails',
  templateUrl: './listingdetails.component.html',
  styleUrls: ['./listingdetails.component.scss']
})
export class ListingdetailsComponent implements OnInit {

  EditFilePath: string;

  validaformm: FormGroup;
  loading: boolean = false;
  equity: any;
  property: any;
  propertyDetails: any;
  photoUrl: string;
  otherCost1Name: string; otherCost2Name: string;
  startDate: any;
  endDate: any;
  submitted = false;

  otherCost1Value: number; otherCost2Value: number;
  EstimatedEquityValue: number;
  supportingDocs: any;
  public otherSupportingDocumentsuploader: FileUploader = new FileUploader({ url: URL });
  // @ViewChild('fileSupportDocs') fileSupportDocs: ElementRef;
  today = new Date();
  public myDatePickerOptions = {
       
        disableUntil : {year: this.today.getFullYear() , month: this.today.getMonth() + 1, day: this.today.getDate() -1}
  }


  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private renderer: Renderer, private propertyservice: PropertyService) { }
  ngOnInit() {
    this.otherSupportingDocumentsuploader.onAfterAddingFile = (file: any) => { file.withCredentials = false; };

    // this.getPropertyById(30);
    this.property = {}
    this.equity = {}
    this.propertyDetails={}
    this.route.paramMap
      .subscribe(param => {
        let id = +param.get('id');
        this.getPropertyById(id);

        this.equity.PropertyId = id;

      });


      let d: Date = new Date();
    this.validaformm = this.formBuilder.group(
      {
        statedate: [{date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}}, [Validators.required]],
        enddate: ['', [Validators.required]],
        statetime: ['', [Validators.required]],
        endtime: ['', [Validators.required]],
      });

      window.scrollTo(0, 0);

 
  }
  timee = [
    {
      name: '12:00 am',
      id: "23:59:59",
    },
    {
      name: '1:00 am',
      id: "01:00:00",

    },
    {
      name: '2:00 am',
      id: "02:00:00"
    },
    {
      name: '3:00 am',
      id: "03:00:00"
    },
    {
      name: '4:00 am',
      id: "04:00:00"
    },
    {
      name: '5:00 am',
      id: "05:00:00"
    },
    {
      name: '6:00 am',
      id: "06:00:00"
    },
    {
      name: '7:00 am',
      id: "07:00:00"
    },
    {
      name: '8:00 am',
      id: "08:00:00"
    },
    {
      name: '9:00 am',
      id: "09:00:00"
    },
    {
      name: '10:00 am',
      id: "10:00:00"
    },
    {
      name: '11:00 am',
      id: "11:00:00"
    },
    {
      name: '12:00 pm',
      id: "12:00:00"
    },
    {
      name: '1:00 pm',
      id: "13:00:00"
    },
    {
      name: '2:00 pm',
      id: "14:00:00"
    },
    {
      name: '3:00 pm',
      id: "15:00:00"
    },
    {
      name: '4:00 pm',
      id: "16:00:00"
    },
    {
      name: '5:00 pm',
      id: "17:00:00"
    },
    {
      name: '6:00  pm',
      id: "18:00:00"
    },
    {
      name: '7:00  pm',
      id: "19:00:00"
    },
    {
      name: '8:00  pm',
      id: "20:00:00"
    },
    {
      name: '9:00  pm',
      id: "21:00:00"
    },
    {
      name: '10:00 pm',
      id: "22:00:00"
    },
    {
      name: '11:00 pm' ,
    id: "23:00:00"
    },

  ]


  getPropertyById(id) {
    this.loading = true;
    this.propertyservice.getPropertyDetails(id).subscribe(res => {
      console.log(res)
      var searchResult: any;
      searchResult = res;

      this.property = searchResult;
      if (searchResult.PropertyDetails.length > 0) {
        this.propertyDetails = searchResult.PropertyDetails[0];
      }
      if (searchResult.PropertyPhotosAndVideos.length > 0) {
        var filteredItems = Object.assign([], searchResult.PropertyPhotosAndVideos).filter(item => item.IsMainPhoto == true);
        if (filteredItems != null) {
          this.photoUrl = filteredItems[0].FilePath;
        } else {
          this.photoUrl = searchResult.PropertyPhotosAndVideos[0].FilePath;
        }
      }
      if (searchResult.PropertyEquities.length > 0) {
        this.equity = searchResult.PropertyEquities[0];


        if (this.equity.AuctionStartDate != null) {
          var stDate = this.equity.AuctionStartDate.toLocaleString();
          var stDatesplit = stDate.split('T')[0].split('-');
          this.startDate = { date: { year: stDatesplit[0], month: stDatesplit[1], day: stDatesplit[2] } };
        }
        if (this.equity.AuctionEndDate != null) {
          var endDate = this.equity.AuctionEndDate.toLocaleString();
          var endDatesplit = endDate.split('T')[0].split('-');
          this.endDate = { date: { year: endDatesplit[0], month: endDatesplit[1], day: endDatesplit[2] } };
        }
      }
      if (searchResult.PropertyEquityOtherCosts.length > 0) {
        this.otherCost1Name = searchResult.PropertyEquityOtherCosts[0].CostName;
        this.otherCost1Value = searchResult.PropertyEquityOtherCosts[0].CostValue;
      }
      if (searchResult.PropertyEquityOtherCosts.length > 1) {
        this.otherCost2Name = searchResult.PropertyEquityOtherCosts[1].CostName;
        this.otherCost2Value = searchResult.PropertyEquityOtherCosts[1].CostValue;
      }
      if (searchResult.PropertySupportingDocs.length > 0) {
        this.supportingDocs = searchResult.PropertySupportingDocs.filter(item => item.FileType == "SupportingDocs");
      }
      this.calculateEquityValue();
      this.loading = false;
    });

  }
  get f() {
    return this.validaformm.controls;
  }

  calculateEquityValue() {
    var ARV = isNaN(this.equity.ARV) ? 0 : this.equity.ARV;
    var MSB = isNaN(this.equity.MinimumStartBid) ? 0 : this.equity.MinimumStartBid;
    var EEC = isNaN(this.equity.EstimatedEscrowCost) ? 0 : this.equity.EstimatedEscrowCost;
    var RC = isNaN(this.equity.RepairCost) ? 0 : this.equity.RepairCost;
    var OC1 = isNaN(this.otherCost1Value) ? 0 : this.otherCost1Value;
    var OC2 = isNaN(this.otherCost2Value) ? 0 : this.otherCost2Value;
    this.EstimatedEquityValue = ARV - (MSB + EEC + RC + OC1 + OC2);
  }


  onStartDateChanged(event: IMyDateModel) {
    this.equity.AuctionStartDate = new Date(event.jsdate);
  }
  onEndDateChanged(event: IMyDateModel) {
    this.equity.AuctionEndDate = new Date(event.jsdate);
  }

  showSupportFilesBrowseDlg() {
    let event = new MouseEvent('click', { bubbles: true });
   
  }

  removeDocument(Id: number) {
    {
      this.propertyservice.deletePropertyDocument(Id, this.property.Id, this.supportingDocs.find(i => i.Id == Id).FilePath).subscribe(searchResult => {

        this.supportingDocs.splice(this.supportingDocs.findIndex(x => x.Id == Id), 1);

      });
    }
  }




  otherCosts = []
  saveEquity() {
    this.submitted = true;
    if (this.validaformm.invalid) {
      return;
    }


    if (this.validaformm.valid) {

      // let otherCosts:any
      if (this.otherCost1Name != "" && this.otherCost1Name != null) {
        this.otherCosts.push({ Id: 0, PropertyId: this.property.Id, CostName: this.otherCost1Name, CostValue: this.otherCost1Value });
      }
      if (this.otherCost2Name != "" && this.otherCost2Name != null) {
        this.otherCosts.push({ Id: 0, PropertyId: this.property.Id, CostName: this.otherCost2Name, CostValue: this.otherCost2Value });
      }
      this.loading = true;

      this.propertyservice.saveOtherCostDetails(this.otherCosts).subscribe(response => {

        this.propertyservice.saveListingDetails(this.equity).subscribe(response => {

          this.otherSupportingDocumentsuploader.onBuildItemForm = (fileItem: any, form: any) => {
            form.append('model', JSON.stringify({ PropertyId: this.property.Id, FileType: "SupportingDocs" }));
          }
          this.otherSupportingDocumentsuploader.uploadAll();
          this.router.navigate(['/propertydetails/userprofile', this.property.Id]);


        });
        this.loading = false;

      });
    }

    //}
  }
}
