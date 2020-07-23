import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property/property.service';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
declare var $: any;

import { AppConstant } from 'src/app/appconstant';

const SERVER_URL: any = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.UPLOADPROPERTYPHOTOSANDVIDEOS;


@Component({
  selector: 'app-photosandvideos',
  templateUrl: './photosandvideos.component.html',
  styleUrls: ['./photosandvideos.component.scss']
})
export class PhotosandvideosComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private propertyservice: PropertyService, private httpClient: HttpClient) { }


  EditFilePath: string;
  EditPhotoDesc: string; EditPhotoId: number;
  loading: boolean = false;
  myfile: []
  property: any
  PropertyPhotos: any;

  ngOnInit() {



    this.property = {}
    this.route.paramMap
      .subscribe(param => {
        let id = +param.get('id');
        this.getPropertyById(id);


      });

    window.scrollTo(0, 0);

  }


  getPropertyById(id) {
    this.loading = true;
    this.propertyservice.getPropertyDetails(id).subscribe(res => {
      var searchResult: any;
      searchResult = res;

      this.property = searchResult;
      this.loading = false;

    });

  }


  saveContinue() {
    this.loading = true;

    this.propertyservice.SavePropertyPhotosAndVideos(this.property.PropertyPhotosAndVideos).subscribe(response => {
      this.loading = false;

      this.router.navigate(['/propertydetails/confirmation', this.property.Id]);
    });


  }

  myUploader(event, fileUpload) {

    for (var i = 0; i < event.files.length; i++) {
      const formData = new FormData();
      // formData.append('model', JSON.stringify({ PropertyId: this.property.Id }));
      formData.append('PropertyId', this.property.Id);
      formData.append('file', event.files[i]);
      this.propertyservice.savePhotosandVideo(formData).subscribe(res => {
        this.getPropertyById(this.property.Id)
      })
      //  this.httpClient.post<any>(SERVER_URL, formData).subscribe(
      //    (res) => {
      //     this.getPropertyById(this.property.Id)

      //    } ,
      //  );
    }
    fileUpload.clear();
  }



  openPopup(id) {
    this.EditPhotoId = id;
    this.EditFilePath = this.property.PropertyPhotosAndVideos.find(i => i.Id == id).FilePath;
    this.EditPhotoDesc = this.property.PropertyPhotosAndVideos.find(i => i.Id == id).PhotoDescription;
    $("#changePass").modal('show');

  }

  cancelModelPop() {
    this.EditFilePath = null; this.EditPhotoDesc = null; this.EditPhotoId = null;
    $("#changePass").modal('hide');
  }


  removePhoto(id: number) {

    this.loading = true

    this.propertyservice.deletePropertyPhoto(id, this.property.Id, this.property.PropertyPhotosAndVideos.find(i => i.Id == id).FilePath).subscribe(response => {
      {
        this.property.PropertyPhotosAndVideos.splice(this.property.PropertyPhotosAndVideos.findIndex(x => x.Id == id), 1);
        this.cancelModelPop();
        this.loading = false

      }

    });

  }

  ChangeMainPhoto(image, Id: number) {
    this.property.PropertyPhotosAndVideos.map(function (x, i, ar) {
      x["IsMainPhoto"] = false;
    });

    this.property.PropertyPhotosAndVideos.find(i => i.Id == Id).IsMainPhoto = true;
  }




  editPhotoDesc() {
    this.property.PropertyPhotosAndVideos.find(i => i.Id == this.EditPhotoId).PhotoDescription = this.EditPhotoDesc;
    $("#changePass").modal('hide');
  }
  //  getPropertyPhotosAndVideos(Id: number) {
  //   this.propertyservice.getPropertyPhotosAndVideos(Id).subscribe(searchResult => {
  //     if (searchResult.Success == 1) {
  //       if (searchResult.data.length > 0) {

  //         this.PropertyPhotos = searchResult.data;
  //       }
  //     }
  //     this.loading = false;
  //   });
  // }
}