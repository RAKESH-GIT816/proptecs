import {
  Component,
  OnInit,
  Renderer,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { PropertyService } from "../../services/property/property.service";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import {
  Property,
  PropertyEquity,
  User,
  PropertySupportingDocs,
} from "../../_models/index";
import { FileUploader, FileUploadModule, FileItem } from "ng2-file-upload";
import { AppConstant } from "../../appconstant";
import { ItemsList } from "@ng-select/ng-select/lib/items-list";
const URL: any =
  AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.PROPERTYFILEUPLOAD;
let token = localStorage.getItem("token");

@Component({
  selector: "app-homeequaity",
  templateUrl: "./homeequaity.component.html",
  styleUrls: ["./homeequaity.component.scss"],
})
export class HomeequaityComponent implements OnInit {
  loading1: boolean = false;
  property: any;
  currentUser: User;
  loading: boolean = false;
  hasErrorMesage: boolean = false;
  hasMessage: boolean = false;
  displayMessage: string;
  equity: PropertyEquity;
  agreeTerms: boolean = false;
  supportingDocs: PropertySupportingDocs[];
  folders = [];
  FolderName;
  DocumentsDisplayArray = [];
  currentFolder;
  public otherSupportingDocumentsuploader: FileUploader = new FileUploader({
    url: URL,
  });
  // public purchaseaggrementuploader: FileUploader = new FileUploader({ url: URL });
  public purchaseaggrementuploader: FileUploader = new FileUploader({
    url: URL,
    headers: [{ name: "Authorization", value: "Bearer " + token }],
  });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(
    private propertiesService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //this.property = new Property();
    this.property = {
      Id: "",
      UserId: "",
      StreetAddress: "",
      City: "",
      State: "",
      ZipCode: "",
      AddedDate: "",
      ApprovedDate: "",
      ShowAddress: "",
      Status: "",
      Latitude: "",
      Longitude: "",
    };
    this.equity = new PropertyEquity();
    
  }

  ngOnInit() {
    //this.purchaseaggrementuploader.onAfterAddingFile = (file: any) => { file.withCredentials = false; };
    this.purchaseaggrementuploader.onAfterAddingFile = (file: any) =>
      this.AddingFile(file);
    this.route.paramMap.subscribe((param) => {
      let id = +param.get("id");
      //let id = +8;
      this.equity.PropertyId = id;
      this.getPropertyById(id);
    });
    window.scrollTo(0, 0);
  }
  public groupBy = ( array , f ) => {
    var groups = {};
    array.forEach( function( o ) {
        var group = JSON.stringify( f(o) );     
        groups[group] = groups[group] || [];
        groups[group].push( o );
    });
    return Object.keys(groups).map(function( group ){
        return groups[group]; 
    })
  }
  calculateBidAmount() {
    var pp = isNaN(this.equity.PurchasePrice) ? 0 : this.equity.PurchasePrice;
    var wf = isNaN(this.equity.WholesaleFee) ? 0 : this.equity.WholesaleFee;
    this.equity.MinimumStartBid = pp + wf;
    if (this.equity.MinimumStartBid * 0.01 > 700) {
      this.equity.WholequityFee = this.equity.MinimumStartBid * 0.01;
    } else {
      this.equity.WholequityFee = 700;
    }
    this.equity.ProfitfromSale = wf - this.equity.WholequityFee;
  }
  add() {
    +this.folders.length;

    this.folders.push({
      id: this.folders.length,
      folderName: "",
      imageData: [],
      supportingDocs: [],
    });
  }

  AddingFile(fileItem: FileItem) {
    console.log(this.purchaseaggrementuploader.queue);

    // let latestFile = this.purchaseaggrementuploader.queue[this.purchaseaggrementuploader.queue.length-1]
    this.DocumentsDisplayArray = [];
    this.DocumentsDisplayArray = this.purchaseaggrementuploader.queue;
    this.DocumentsDisplayArray.map((item) => {
      if (!item.folderName) {
        item.folderName = this.currentFolder;
        item.withCredentials = false;
        item.DocId = this.DocumentsDisplayArray.length;
      }
    });
   
    this.folders.map((i) => {
      i.imageData = [];
    });
    this.folders.map((item) => {
      this.DocumentsDisplayArray.map((item1) => {
        if (item1.folderName == item.folderName) {
          item.imageData.push(item1);
        }
      });
    });
  
  }

  Addfoldername(data) {
    // console.log(i)
   
    this.currentFolder = data.folderName;
  }
  cmpare(index) {
    return index;
  }
  remove(data) {
    this.folders.map((item) => {
      item.imageData.map((item1, index) => {
        if (data.DocId == item1.DocId) {
          item.imageData.splice(index, 1);
          return;
        }
      });
    });
    this.DocumentsDisplayArray.map((item, index) => {
      if (data.DocId == item.DocId) {
        this.DocumentsDisplayArray.splice(index, 1);
        return;
      }
    });

    this.purchaseaggrementuploader.queue = this.DocumentsDisplayArray;
  }

  getPropertyById(Id: number) {
    this.loading = true;
    this.loading1 = true;

    this.propertiesService.getPropertyDetails(Id).subscribe((searchResult) => {
      if (searchResult) {
        this.property = searchResult;

        if (this.property.PropertyEquities.length > 0) {
          this.equity = this.property.PropertyEquities[0];
        }
        if (this.property.PropertySupportingDocs.length > 0) {
          this.supportingDocs = this.property.PropertySupportingDocs;
          this.folders=[];
          this.supportingDocs.map((item) => {
            this.folders.push({
              id: item.Id,
              folderName: item.FileType,
              supportingDocs: [item],
            });
          });
          const result =  this.folders.reduce((acc, curr) => {  
            const existing = acc.find(e => e.folderName == curr.folderName);
            if (existing) {
              existing.supportingDocs = existing.supportingDocs.concat(curr.supportingDocs);
            } else {
              acc.push(curr);
            }
            return acc;
          }, []);
        
        this.folders=result;
        console.log(this.folders)
        if(this.purchaseaggrementuploader.queue){
        this.DocumentsDisplayArray = [];
        this.DocumentsDisplayArray = this.purchaseaggrementuploader.queue;
        this.DocumentsDisplayArray.map((item) => {
          if (!item.folderName) {
            item.folderName = this.currentFolder;
            item.withCredentials = false;
            item.DocId = this.DocumentsDisplayArray.length;
          }
        });
       
        this.folders.map((i) => {
          i.imageData = [];
        });
        this.folders.map((item) => {
          this.DocumentsDisplayArray.map((item1) => {
            if (item1.folderName == item.folderName) {
              item.imageData.push(item1);
            }
          });
        });
      }else{
        this.folders=result;
      }
          this.equity.agreeTerms = true;
        }else{
          this.folders=[];
        }
      }
      this.loading = false;

      this.loading1 = false;
    });
  }

  saveEquity() {
    this.purchaseaggrementuploader.queue = this.DocumentsDisplayArray;

    this.loading = true;
    this.hasErrorMesage = this.hasMessage = false;
    this.displayMessage = null;
    this.propertiesService
      .SaveWholesaleProfit(this.equity)
      .subscribe((response) => {
        if (response == null) {
          this.DocumentsDisplayArray.map((item) => {
            this.purchaseaggrementuploader.onBuildItemForm = (
              fileItem: any,
              form: any
            ) => {
              form.append("PropertyId", this.equity.PropertyId);
              form.append("FileType", item.folderName);
            };
            this.purchaseaggrementuploader.uploadAll();
          });
          this.displayMessage = "Property Equity saved Successfully!";
          this.loading = this.hasErrorMesage = false;
          this.hasMessage = true;
          this.router.navigate([
            "propertydetails/propertyphotosandvideos",
            this.equity.PropertyId,
          ]);
        } else {
          this.displayMessage = "Property Not Saved!!";
          this.loading = this.hasMessage = false;
          this.hasErrorMesage = true;
          //window.scrollTo(0, 0);
        }
        this.loading1 = false;
      });
  }

  showPurchaseAggrementBrowseDlg() {
    let event = new MouseEvent("click", { bubbles: true });
    //this.renderer.invokeElementMethod(this.filePurchaseDocs.nativeElement, 'dispatchEvent', [event]);
  }

  removeDocument(Id: number) {
    if (confirm("Are you sure you wan to delete this document?")) {
      this.loading = true;
      this.loading1 = true;

      this.propertiesService
        .deletePropertyDocument(
          Id,
          this.property.Id,
          this.supportingDocs.find((i) => i.Id == Id).FilePath
        )
        .subscribe((response) => {
          // if (response) {
            this.supportingDocs.splice(
              this.supportingDocs.findIndex((x) => x.Id == Id),
              1
            );
            this.displayMessage = "Document removed successfully!";
           this.getPropertyById(this.equity.PropertyId)
         
            this.loading = this.hasErrorMesage = false;
            this.hasMessage = true;

          // } else {
          //   this.displayMessage = "Document Upload Unsuccessfull!!";
          //   this.loading = this.hasMessage = false;
          //   this.hasErrorMesage = true;
          // }
          this.loading1 = false;
        });
    }
  }
  dataFiles: Array<File> = new Array<File>();
  onDataFileSelectEvent(e) {
    this.dataFiles.splice(0, this.dataFiles.length);

    e.files.forEach((f) => {
      this.dataFiles.push(f.rawFile);
    });

    this.process();
  }

  process() {
    const result = this.propertiesService
      .UploadFiless(this.dataFiles)
      .subscribe((val) => {});
  }
}
