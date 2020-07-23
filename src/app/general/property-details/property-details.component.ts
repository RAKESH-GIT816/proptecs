import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PropertyService } from '../../services/property/property.service'
import { Router, NavigationExtras, ActivatedRoute, } from '@angular/router';
import { AppConstant } from '../../appconstant';
import { GalleriaModule } from 'primeng/galleria';
import * as _ from 'lodash'; 
declare let swal: any;
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  loading: boolean = false;
  propertyId: any
  userdetails: any
  propDetail: any
  propertyPhotosAndVideos: any
  AppliancesList: any
  selectedHomeappliances: Array<string> = [];
  selectedfloorcovering = [];
  selectedroomtypes = [];
  selectedindoorfeatures = [];
  selectedCoolingType = [];
  selectedHeatingTypes = [];
  selectedHeatingFuels = [];
  selectedBuildingDetails = [];
  selectedArchitecteralStyles = [];
  selectedExteriors = [];
  selectedOutDoorAmenities = [];
  selectedParkings = [];
  selectedRoofs = [];
  selectedViews = [];
  checklogout: any
  propertyDetails: any
  propertyEquities: any
  fav: any;
  images: any[];
  CurUserid =0
  selectedDocument;
  imageLength: any;

  constructor(
    private propertyservice: PropertyService,
    private router: Router,
    private actrouter: ActivatedRoute,

  ) {
    this.userdetails = JSON.parse(localStorage.getItem("UserDetails"));
    if(this.userdetails)
    {    
     this.CurUserid = this.userdetails.Id
     }

    this.actrouter.params.subscribe(params => {
      this.propertyId = params.id;
    });


  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.


  }

  ngOnInit() {

    this.propertyEquities = {}
    this.propDetail = {}
    this.propertyDetails = {}
    // this.getPropertyDetails = () => {
    //   this.loadscript();
    // } 
    this.getPropertyDetails(this.propertyId);


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
  getPropertyDetails(property_id: any) {
    this.loading = true;
    this.propertyservice.getPropertyDetails(property_id)
      .subscribe(res => {

        this.propDetail = res;
        this.propertyPhotosAndVideos = this.propDetail.PropertyPhotosAndVideos;
        this.propertyDetails = this.propDetail.PropertyDetails[0];
        this.propertyEquities = this.propDetail.PropertyEquities[0];
        // console.log(this.propertyDetails)
        // console.log(this.propertyPhotosAndVideos)
        // console.log(this.propertyPhotosAndVideos.length)
       
        // $('#addCardModal').modal('hide');

        // this.forgallery();
        this.images = [];
        for (let i = 0; i < this.propertyPhotosAndVideos.length; i++) {
          this.images.push({ source: this.propertyPhotosAndVideos[i].FilePath, alt: '', title: '' })
        }

       
        this.AppliancesList = (this.propDetail.PropertyDetails[0].Appliances) ? this.propDetail.PropertyDetails[0].Appliances.split(',') : [];
        this.selectedfloorcovering = (this.propDetail.PropertyDetails[0].FloorCovering) ? this.propDetail.PropertyDetails[0].FloorCovering.split(',') : [];
        this.selectedroomtypes = (this.propDetail.PropertyDetails[0].RoomDetails) ? this.propDetail.PropertyDetails[0].RoomDetails.split(',') : [];
        this.selectedindoorfeatures = (this.propDetail.PropertyDetails[0].IndoorFeatures) ? this.propDetail.PropertyDetails[0].IndoorFeatures.split(',') : [];
        this.selectedCoolingType = (this.propDetail.PropertyDetails[0].CoolingTypes) ? this.propDetail.PropertyDetails[0].CoolingTypes.split(',') : [];
        this.selectedHeatingTypes = (this.propDetail.PropertyDetails[0].HeatingTypes) ? this.propDetail.PropertyDetails[0].HeatingTypes.split(',') : [];
        this.selectedHeatingFuels = (this.propDetail.PropertyDetails[0].HeatingFuels) ? this.propDetail.PropertyDetails[0].HeatingFuels.split(',') : [];
        this.selectedBuildingDetails = (this.propDetail.PropertyDetails[0].BuildingAmenities) ? this.propDetail.PropertyDetails[0].BuildingAmenities.split(',') : [];
        this.selectedArchitecteralStyles = (this.propDetail.PropertyDetails[0].ArchitecturalStyles) ? this.propDetail.PropertyDetails[0].ArchitecturalStyles.split(',') : [];
        this.selectedExteriors = (this.propDetail.PropertyDetails[0].Exteriors) ? this.propDetail.PropertyDetails[0].Exteriors.split(',') : [];
        this.selectedOutDoorAmenities = (this.propDetail.PropertyDetails[0].OurdoorAmenities) ? this.propDetail.PropertyDetails[0].OurdoorAmenities.split(',') : [];
        this.selectedParkings = (this.propDetail.PropertyDetails[0].Parking) ? this.propDetail.PropertyDetails[0].Parking.split(',') : [];
        this.selectedRoofs = (this.propDetail.PropertyDetails[0].Roofs) ? this.propDetail.PropertyDetails[0].Roofs.split(',') : [];
        this.selectedViews = (this.propDetail.PropertyDetails[0].Views) ? this.propDetail.PropertyDetails[0].Views.split(',') : [];
        this.loadscript(this.propertyPhotosAndVideos);
        this.loading = false;

        // this.propDetail.PropertySupportingDocs = this.groupBy(this.propDetail.PropertySupportingDocs, function(item) {
        //   return [item.FileType];
        // });
        let grouped = _.groupBy(this.propDetail.PropertySupportingDocs, function(docs) {
          return docs.FileType;
        });
        this.propDetail.PropertySupportingDocs=grouped;
      },
        (err) => {

        });
    

  }
  dismissmodal() {
    $('#addCardModal').modal('toggle');
  }
  selectedDoc(data){
this.selectedDocument=data.value;
console.log(this.selectedDocument)
  }
  viewbidproperty() {
    this.router.navigate(['/bidproperty/' + this.propertyId + '/bid']);
  }

  // saveProperty(propId){
  //   var userId =0;
  //   if(this.userdetails!=null)
  //   {
  //     userId = this.userdetails.Id;
  //     this.propertyservice.saveProperty(propId,userId)
  //     .subscribe(res => {        
  //       console.log(res);
  //       this.getPropertyDetails(propId);
  //     },
  //       (err) => {
  //         console.log('Err' + err.error());
  //       });
  //   }
  //   else{
  //     this.router.navigate(['/login']); 
  //   }

  // }

  // unsaveProperty(propId) {
  //   var userId = 0;
  //   if (this.userdetails != null) {
  //     userId = this.userdetails.Id;
  //     this.propertyservice.unsaveFavProperty(propId, userId)
  //       .subscribe(res => {
  //         console.log(res);
  //         this.getPropertyDetails(propId);
  //       },
  //         (err) => {
  //           console.log('Err' + err.error());
  //         });
  //   }
  //   else {
  //     this.router.navigate(['/login']);
  //   }
  // }


  loadscript(imageList) { 

    /*FancyBox*/

    setTimeout(() => {


      $('.fancybox').fancybox();

      $('#big-img').flexslider({
        animation: "fade",
        controlNav: false,
        directionNav: false,
        animationLoop: true,
        slideshow: false,
        smoothHeight: true,
        sync: "#small-img",
        start: function (slider) {
          $('#big-img .total-slide').text(slider.count);
        },
        after: function (slider) {
          $('#big-img .current-slide').text(slider.currentSlide + 1);
        }
      });

      $('#small-img').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: true,
        slideshow: false,
        directionNav: true,
        itemWidth: 123,
        itemMargin: 11,
        asNavFor: '#big-img'
      });

      $(".fancybox-ampliar2").click(function () { 
        var img = [];
        for (let i = 0; i < imageList.length; i++) {
          img.push({ href: ''+imageList[i].FilePath+'' });
        }

        
        $.fancybox.open(
            img        
        );
      });

      // $("#fancybox-ampliar2").click(function () {
      //   $.fancybox.open([
      //     { href: 'assets/images/slide-b-img2.png' },
      //     { href: 'assets/images/slide-b-img3.png' },
      //     { href: 'assets/images/slide-b-img4.png' },
      //     { href: 'assets/images/slide-b-img5.png' },
      //     { href: 'assets/images/slide-b-img1.png' },
      //     { href: 'assets/images/slide-b-img1.png' }
      //   ]);
      // });
      // $("#fancybox-ampliar3").click(function () {
      //   $.fancybox.open([
      //     { href: 'assets/images/slide-b-img3.png' },
      //     { href: 'assets/images/slide-b-img4.png' },
      //     { href: 'assets/images/slide-b-img5.png' },
      //     { href: 'assets/images/slide-b-img1.png' },
      //     { href: 'assets/images/slide-b-img1.png' },
      //     { href: 'assets/images/slide-b-img2.png' }
      //   ]);
      // });
      // $("#fancybox-ampliar4").click(function () {
      //   $.fancybox.open([
      //     { href: 'assets/images/slide-b-img4.png' },
      //     { href: 'assets/images/slide-b-img5.png' },
      //     { href: 'assets/images/slide-b-img1.png' },
      //     { href: 'assets/images/slide-b-img1.png' },
      //     { href: 'assets/images/slide-b-img2.png' },
      //     { href: 'assets/images/slide-b-img3.png' }
      //   ]);
      // });
      // $("#fancybox-ampliar5").click(function () {
      //   $.fancybox.open([
      //     { href: 'assets/images/slide-b-img5.png' },
      //     { href: 'assets/images/slide-b-img1.png' },
      //     { href: 'assets/images/slide-b-img1.png' },
      //     { href: 'assets/images/slide-b-img2.png' },
      //     { href: 'assets/images/slide-b-img3.png' },
      //     { href: 'assets/images/slide-b-img4.png' }
      //   ]);
      // });
      // $("#fancybox-ampliar6").click(function () {
      //   $.fancybox.open([
      //     { href: 'assets/images/slide-b-img1.png' },
      //     { href: 'assets/images/slide-b-img1.png' },
      //     { href: 'assets/images/slide-b-img2.png' },
      //     { href: 'assets/images/slide-b-img3.png' },
      //     { href: 'assets/images/slide-b-img4.png' },
      //     { href: 'assets/images/slide-b-img5.png' }
      //   ]);
      // });

    }, 300);
    /* knob js */
    $('.knob').knob({
      'format': function (value) {
        if (value > 0) {
          return value + '%';
        } else {
          return value;
        }
      }
    });
  }

}
