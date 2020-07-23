import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/services/property/property.service';

import { Property } from '../_models/property';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-sellproperties',
    templateUrl: './sellproperties.component.html',
    styleUrls: ['./sellproperties.component.css']
})
export class SellpropertiesComponent implements OnInit {

    loading: boolean = false;
    googleGeoCode: string = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCqogx7GcaZ1MypETQ2Lae9ys7OKSulIb4&address=:my_own_keyword";

    // States = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    States = [
        { id: 'AL', name: 'Alabama' },
        { id: "AS", name: 'American Samoa' },
        { id: "AZ", name: 'Arizona' },
        { id: "AR", name: 'Arkansas' },
        { id: "CA", name: 'California' },
        { id: "CO", name: 'Colorado' },
        { id: "CT", name: 'Connecticut' },
        { id: "DE", name: 'Delaware' },
        { id: "DC", name: 'District Of Columbia' },
        { id: "FM", name: 'Federated States Of Micronesia' },
        { id: "FL", name: 'Florida' },
        { id: "GA", name: 'Georgia' },
        { id: "GU", name: 'Guam' },
        { id: "HI", name: 'Hawaii' },
        { id: "ID", name: 'Idaho' },
        { id: "IL", name: 'Illinois' },
        { id: "IN", name: 'Indiana' },
        { id: "IA", name: 'Iowa' },
        { id: "KS", name: 'Kansas' },
        { id: "KY", name: 'Kentucky' },
        { id: "LA", name: 'Louisiana' },
        { id: "ME", name: 'Maine' },
        { id: "MH", name: 'Marshall Islands' },
        { id: "MD", name: 'Maryland' },
        { id: 'MA', name: 'Massachusetts' },
        { id: 'MI', name: 'Michigan' },
        { id: 'MN', name: 'Minnesota' },
        { id: 'MS', name: 'Mississippi' },
        { id: 'MO', name: 'Missouri' },
        { id: 'MT', name: 'Montana' },
        { id: 'NE', name: 'Nebraska' },
        { id: 'NV', name: 'Nevada' },
        { id: 'NH', name: 'New Hampshire' },
        { id: 'NJ', name: 'New Jersey' },
        { id: 'NM', name: 'New Mexico' },
        { id: 'NY', name: 'New York' },
        { id: 'NC', name: 'North Carolina' },
        { id: 'ND', name: 'North Dakota' },
        { id: 'MP', name: 'Northern Mariana Islands' },
        { id: 'OH', name: 'Ohio' },
        { id: 'OK', name: 'Oklahoma' },
        { id: 'OR', name: 'Oregon' },
        { id: 'PW', name: 'Palau' },
        { id: 'PA', name: 'Pennsylvania' },
        { id: 'PR', name: 'Puerto Rico' },
        { id: 'RI', name: 'Rhode Island' },
        { id: 'SC', name: 'South Carolina' },
        { id: 'SD', name: 'South Dakota' },
        { id: 'TN', name: 'Tennessee' },
        { id: 'TX', name: 'Texas' },
        { id: 'UT', name: 'Utah' },
        { id: 'VT', name: 'Vermont' },
        { id: 'VI', name: 'Virgin Islands' },
        { id: 'VA', name: 'Virginia' },
        { id: 'WA', name: 'Washington' },
        { id: 'WV', name: 'West Virginia' },
        { id: 'WI', name: 'Wisconsin' },
        { id: 'WY', name: 'Wyoming' }
    ]

    AppliancesList = ['Dishwasher', 'Dryer', 'Range/ oven', 'Microwave', 'Washer', 'Refrigerator', 'Trash compactor'];

    RoomDetailsList = ['Breakfast nook', 'Office', 'Dinning Room', 'Pantry', 'Family Room', 'Recreation Room', 'Laundry Room', 'Workshop', 'Library', 'Solarium / Atrium', 'Master Bath', 'Sun Room', 'Mud Room', 'Walk-In Closet'];

    CoolingTypes = ['Central', 'Solar', 'Evaporative', 'wall', 'Geothermal', 'other', 'Refigeration', 'None'];

    HeatingTypes = ['Baseboard', 'Radiant', 'ForcedAir', 'Stove', 'Geothermal', 'Wall', 'HeatPump', 'Other'];

    HeatingFuels = ['Coal', 'Solar', 'Electric', 'Wood / Pellet', 'Gas', 'Other', 'Oil', 'None', 'Propane / Butane'];

    IndoorFeatures = ['Attic', 'Mother-In-Law Apatment', 'Cable Ready', 'Security System,', 'CeilingFans', 'SkyLights', 'Double Pane / Storm Windows', 'Vaulted Ceiling', 'FirePlace', 'Wet Bar', 'Intercom System', 'Wired', 'Jetted Tub'];

    BuildingDetails = ['Assisted Living Community', 'Gated Entry', 'BasketBall Court', 'Near Transportation', 'Controlled Access', 'Sports Court', 'Over 55+ Active Community', 'Disabled Access', 'DoorMan', 'Storage', 'Elivator', 'Tennis Court', 'Fitness Center'];

    ArchitecteralStyles = ['Bungalow', 'Modern', 'Cape Cod', 'Queen Anne /Victorian', 'Colonial', 'Ranch / Rambler', 'Contemporary', 'Santa Fe / pueblo Style', 'Crafts Man', 'Spanish', 'French', 'Split Level', 'Georgiane', 'Tudor', 'Loft', 'Other'];

    Exteriors = ['Brick', 'Stucco', 'Cement / Concrete', 'Vinyl', 'Composition', 'Wood', 'metal', 'Wood Products', 'shingle', 'Other', 'Stone'];

    OutDoorAmenities = ['Balcony / Patio', 'Lawn', 'Barbecue area', 'Pond', 'deck', 'Pool', 'Dock', 'porched', 'Fenced Yard', 'RV Parking', 'Garden', 'Sauna', 'Green house', 'Sprinkler system', 'Hot Tub / Spa', 'water Front'];

    Parkings = ['CarPort', 'Off-Street', 'Garrage-Attached', 'On-Street', 'Garage Detached', 'None'];

    Roofs = ['Asphalt', 'Shake Shingle', 'Built-Up', 'Slate', 'Composition', 'Tile', 'Metal', 'other'];

    Views = ['City', 'Territorial', 'Mountain', 'Water', 'Park', 'None'];

    Basements = ['Finished', 'Unfinished', 'Partially Finished', 'None'];

    FloorCovering = ['Carpet', 'Slate', 'Concrete', 'Softwood', 'Hardwood', 'Tile', 'Laminate', 'Other', 'Linoleum / Vinyl'];


    HomeTypes = ['Single Family Residence', 'Townhouse', 'Condominium', 'Manufactured/Mobile Home', 'Multi-Family', 'Land', 'Timeshare', 'Commercial', 'Other'];
    brokerco_op = ['true','false'];
    source: any;
    property: any;
    model4: any;
    userdetails: any;
    propertydetails: any;
    selectedHomeappliances: Array<string> = []; selectedfloorcovering = []; selectedroomtypes = []; selectedindoorfeatures = []; selectedCoolingType = [];
    selectedHeatingTypes = []; selectedHeatingFuels = []; selectedBuildingDetails = []; selectedArchitecteralStyles = []; selectedExteriors = []; selectedOutDoorAmenities = []; selectedParkings = [];
    selectedRoofs = []; selectedViews = [];
    selectedBasement: any;
    openAddressPopUpOnInit: boolean = false;
    id: string;

    constructor(private acrouter: ActivatedRoute, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,

        private propertyservice: PropertyService
    ) {
        this.userdetails = JSON.parse(localStorage.getItem("UserDetails"));

    }
    autoaddress: FormGroup;
    propertyform: FormGroup;
    submitted = false;
    ngOnInit() {

        this.property = {}
        this.propertydetails = {}
        // this.model4 = [];
        this.property.ShowAddress = true;
        //pass dynamic value
        this.propertydetails.LotUnits = "Acres"


        this.route.paramMap
            .subscribe(param => {
                let id = +param.get('id');
                if (id != 0 && !isNaN(id)) {
                    this.property.Id = id;
                    this.getPropertyById(id);
                } else {
                    this.property.Id = 0;
                    this.openAddressPopUpOnInit = true;
                }
            });

        window.scrollTo(0, 0);

        this.propertyform = this.formBuilder.group({
            showaddress: [],
            hometype: ['', Validators.required],
            squrefeet: ['', Validators.required],
            Bedrooms: ['', Validators.required],
            Bathrooms: ['', Validators.required],
            Lotsize: [],
            Lotsize_st: [],
            YearBuilt: ['', Validators.required],
            Garage_Sq_ft: [],
            Basement_Square_feet: [],
            units: [],
            buildings: [],
            stories: [],
            occupancy: [],
            brokerco_op: [],
            caprate: [],
            noi: [],
            zoning: [],
            Monthly_HOA_dues: [],
            Propert_des: ['', Validators.required],
            Repair_des: ['', Validators.required]
        });

        // this.autoaddress = this.formBuilder.group({
        //     autostreet: ['', Validators.required],
        //     autocity: ['', Validators.required],
        //     autostate: ['', Validators.required],
        //     autozipcode: ['', Validators.required],
        //   });
        window.scrollTo(0, 0);

    }

    getPropertyById(Id: number) {
        this.loading = true;
        this.propertyservice.getPropertyDetails(Id).subscribe(
            res => {
                var searchResult: any;
                searchResult = res
                this.property = searchResult
                this.propertydetails = this.property.PropertyDetails[0];
                console.log(this.propertydetails)
                // if(this.propertydetails.brokerco_op==true){
                //     this.propertydetails.brokerco_op="Yes"
                // }else{
                //     this.propertydetails.brokerco_op="No"
                // }
                {
                    this.property.ShowAddress = (this.property.ShowAddress == null) ? true : this.property.ShowAddress;
                    this.model4 = this.property.StreetAddress;
                    if (searchResult.PropertyDetails.length > 0) {
                        this.selectedHomeappliances = (this.propertydetails.Appliances) ? this.propertydetails.Appliances.split(',') : [];
                        this.selectedBasement = this.propertydetails.BasementDetails;
                        this.selectedfloorcovering = (this.propertydetails.FloorCovering) ? this.propertydetails.FloorCovering.split(',') : [];
                        this.selectedroomtypes = (this.propertydetails.RoomDetails) ? this.propertydetails.RoomDetails.split(',') : [];
                        this.selectedindoorfeatures = (this.propertydetails.IndoorFeatures) ? this.propertydetails.IndoorFeatures.split(',') : [];
                        this.selectedCoolingType = (this.propertydetails.CoolingTypes) ? this.propertydetails.CoolingTypes.split(',') : [];
                        this.selectedHeatingTypes = (this.propertydetails.HeatingTypes) ? this.propertydetails.HeatingTypes.split(',') : [];
                        this.property.ShowAddress = true;
                        this.selectedHeatingFuels = (this.propertydetails.HeatingFuels) ? this.propertydetails.HeatingFuels.split(',') : [];
                        this.selectedBuildingDetails = (this.propertydetails.BuildingAmenities) ? this.propertydetails.BuildingAmenities.split(',') : [];
                        this.selectedArchitecteralStyles = (this.propertydetails.ArchitecturalStyles) ? this.propertydetails.ArchitecturalStyles.split(',') : [];
                        this.selectedExteriors = (this.propertydetails.Exteriors) ? this.propertydetails.Exteriors.split(',') : [];
                        this.selectedOutDoorAmenities = (this.propertydetails.OurdoorAmenities) ? this.propertydetails.OurdoorAmenities.split(',') : [];
                        this.selectedParkings = (this.propertydetails.Parking) ? this.propertydetails.Parking.split(',') : [];
                        this.selectedRoofs = (this.propertydetails.Roofs) ? this.propertydetails.Roofs.split(',') : [];
                        this.selectedViews = (this.propertydetails.Views) ? this.propertydetails.Views.split(',') : [];
                    }

                }
                this.loading = false;
            }, err => console.log(err)
        )


    }

    get f() { return this.propertyform.controls; }

    saveCountine() {

        if (this.propertyform.valid) {
            this.savepropertydetails();
        }

        this.submitted = true;
        if (this.propertyform.invalid) {
            return;
        }

    }


    ngAfterViewInit() {
        if (this.openAddressPopUpOnInit) {
            $("#addressmodal").modal('show');
        }
    }

    // autosearchaddressSelected(data) {
    //     this.model4 = data
    //     if (this.model4 != null) {
    //         this.property.Latitude = this.model4.geometry.location.lat;
    //         this.property.Longitude = this.model4.geometry.location.lng;
    //         var addressList = this.model4.formatted_address.split(", ");
    //         this.property.StreetAddress = addressList[0];
    //         this.model4 = addressList[0];
    //         this.property.City = addressList[1];
    //         this.property.State = addressList[2].split(" ")[0];
    //         this.property.ZipCode = addressList[2].split(" ")[1];
    //     }
    // }


    proid: any

    getPropertyDetailsFromHouseCanary() {

        this.loading = true
        $("#addressmodal").modal('hide');

        this.propertyservice.getPropertyDetailsFromHouseCanary(this.property.StreetAddress,
            this.property.City, this.property.State, this.property.ZipCode).
            subscribe(res => {
                this.loading = false

                var searchResult: any = res;

                if (searchResult.success && searchResult.properties.length > 0) {


                    this.propertydetails.Bedrooms = searchResult.properties[0].structures[0].beds_count;
                    this.propertydetails.Bathrooms = searchResult.properties[0].structures[0].baths_count;
                    this.propertydetails.YearBuilt = searchResult.properties[0].structures[0].year_built;
                    // this.propertydetails.PropertyType = searchResult.data[0]["property/details"].result.property.property_type;
                    this.propertydetails.PropertyType = searchResult.properties[0].structures[0].building_type;
                    this.propertydetails.FinishedSqFt = searchResult.properties[0].structures[0].total_size;
                    this.propertydetails.LotSize = searchResult.properties[0].parcel.acres;
                    this.propertydetails.GarageSqFt = searchResult.properties[0].structures[0].garage_size;
                    this.propertydetails.BasementSqFt = searchResult.properties[0].structures[0].basement_size;

                }
            });

    }



    //--


    savepropertydetails() {
        this.loading = true;

        this.property.UserId = this.userdetails.Id;
        this.propertyservice.SavePropertyAddress(this.property).subscribe(response => {
            {
                var res: any = response

                this.propertydetails.PropertyId = res.PropertyId;
                this.propertydetails.Appliances = this.selectedHomeappliances.join(',');
                this.propertydetails.FloorCovering = this.selectedfloorcovering.join(',');
                this.propertydetails.RoomDetails = this.selectedroomtypes.join(',');
                this.propertydetails.IndoorFeatures = this.selectedindoorfeatures.join(',');
                this.propertydetails.CoolingTypes = this.selectedCoolingType.join(',');
                this.propertydetails.HeatingTypes = this.selectedHeatingTypes.join(',');
                this.propertydetails.HeatingFuels = this.selectedHeatingFuels.join(',');
                this.propertydetails.BuildingAmenities = this.selectedBuildingDetails.join(',');
                this.propertydetails.ArchitecturalStyles = this.selectedArchitecteralStyles.join(',');
                this.propertydetails.Exteriors = this.selectedExteriors.join(',');
                this.propertydetails.OurdoorAmenities = this.selectedOutDoorAmenities.join(',');
                this.propertydetails.Parking = this.selectedParkings.join(',');
                this.propertydetails.Roofs = this.selectedRoofs.join(',');
                this.propertydetails.Views = this.selectedViews.join(',');
                this.propertydetails.BasementDetails = this.selectedBasement;

                // this.propertydetails.units = this.
                this.propertyservice.SavePropertyDetails(this.propertydetails)
                    .subscribe(response => {


                        // this.router.navigate(['/wholesaleprofit', this.propertydetails.PropertyId]);
                        this.router.navigate(['propertydetails/wholesaleprofit/' + this.propertydetails.PropertyId]);
                        this.loading = true;
                    }, err => console.log(err)
                    );
            } {

            }
        }, (err) => {

            this.loading = false;
        });

    }

    //--




    updateSelectedCheckboxListDetails(type, event) {

        if (event.target.checked) {
            if (type == "homeappliances") {
                if (this.selectedHomeappliances.indexOf(event.target.name) < 0) {

                    this.selectedHomeappliances.push(event.target.name);

                }
            }
            else if (type == "floorcovering") {
                if (this.selectedfloorcovering.indexOf(event.target.name) < 0) {
                    this.selectedfloorcovering.push(event.target.name);
                }
            }
            else if (type == "roomtype") {
                if (this.selectedroomtypes.indexOf(event.target.name) < 0) {
                    this.selectedroomtypes.push(event.target.name);
                }
            }
            else if (type == "indoorfeatures") {
                if (this.selectedindoorfeatures.indexOf(event.target.name) < 0) {
                    this.selectedindoorfeatures.push(event.target.name);
                }
            }
            else if (type == "coolingtype") {
                if (this.selectedCoolingType.indexOf(event.target.name) < 0) {
                    this.selectedCoolingType.push(event.target.name);
                }
            }
            else if (type == "heatingtype") {
                if (this.selectedHeatingTypes.indexOf(event.target.name) < 0) {
                    this.selectedHeatingTypes.push(event.target.name);
                }
            }
            else if (type == "heatingfuel") {
                if (this.selectedHeatingFuels.indexOf(event.target.name) < 0) {
                    this.selectedHeatingFuels.push(event.target.name);
                }
            }
            else if (type == "buildingdetails") {
                if (this.selectedBuildingDetails.indexOf(event.target.name) < 0) {
                    this.selectedBuildingDetails.push(event.target.name);
                }
            }
            else if (type == "architecteralstyles") {
                if (this.selectedArchitecteralStyles.indexOf(event.target.name) < 0) {
                    this.selectedArchitecteralStyles.push(event.target.name);
                }
            }
            else if (type == "exteriors") {
                if (this.selectedExteriors.indexOf(event.target.name) < 0) {
                    this.selectedExteriors.push(event.target.name);
                }
            }
            else if (type == "outdooramenities") {
                if (this.selectedOutDoorAmenities.indexOf(event.target.name) < 0) {
                    this.selectedOutDoorAmenities.push(event.target.name);
                }
            }
            else if (type == "parkings") {
                if (this.selectedParkings.indexOf(event.target.name) < 0) {
                    this.selectedParkings.push(event.target.name);
                }
            }
            else if (type == "roofs") {
                if (this.selectedRoofs.indexOf(event.target.name) < 0) {
                    this.selectedRoofs.push(event.target.name);
                }
            }
            else if (type == "views") {
                if (this.selectedViews.indexOf(event.target.name) < 0) {
                    this.selectedViews.push(event.target.name);
                }
            }
        } else {
            if (type == "homeappliances") {
                if (this.selectedHomeappliances.indexOf(event.target.name) > -1) {
                    this.selectedHomeappliances.splice(this.selectedHomeappliances.indexOf(event.target.name), 1);
                }
            }
            //else if (type == "basement") {
            //    if (this.selectedHomeappliances.indexOf(event.target.name) > -1) {
            //        this.selectedHomeappliances.splice(this.selectedHomeappliances.indexOf(event.target.name), 1);
            //    }
            //}
            else if (type == "floorcovering") {
                if (this.selectedfloorcovering.indexOf(event.target.name) > -1) {
                    this.selectedfloorcovering.splice(this.selectedHomeappliances.indexOf(event.target.name), 1);
                }
            }
            else if (type == "roomtype") {
                if (this.selectedroomtypes.indexOf(event.target.name) > -1) {
                    this.selectedroomtypes.splice(this.selectedHomeappliances.indexOf(event.target.name), 1);
                }
            }
            else if (type == "indoorfeatures") {
                if (this.selectedindoorfeatures.indexOf(event.target.name) > -1) {
                    this.selectedindoorfeatures.splice(this.selectedindoorfeatures.indexOf(event.target.name), 1);
                }
            }
            else if (type == "coolingtype") {
                if (this.selectedCoolingType.indexOf(event.target.name) > -1) {
                    this.selectedCoolingType.splice(this.selectedCoolingType.indexOf(event.target.name), 1);
                }
            }
            else if (type == "heatingtype") {
                if (this.selectedHeatingTypes.indexOf(event.target.name) > -1) {
                    this.selectedHeatingTypes.splice(this.selectedHeatingTypes.indexOf(event.target.name), 1);
                }
            }
            else if (type == "heatingfuel") {
                if (this.selectedHeatingFuels.indexOf(event.target.name) > -1) {
                    this.selectedHeatingFuels.splice(this.selectedHeatingFuels.indexOf(event.target.name), 1);
                }
            }
            else if (type == "buildingdetails") {
                if (this.selectedBuildingDetails.indexOf(event.target.name) > -1) {
                    this.selectedBuildingDetails.splice(this.selectedBuildingDetails.indexOf(event.target.name), 1);
                }
            }
            else if (type == "architecteralstyles") {
                if (this.selectedArchitecteralStyles.indexOf(event.target.name) > -1) {
                    this.selectedArchitecteralStyles.splice(this.selectedArchitecteralStyles.indexOf(event.target.name), 1);
                }
            }
            else if (type == "exteriors") {
                if (this.selectedExteriors.indexOf(event.target.name) > -1) {
                    this.selectedExteriors.splice(this.selectedExteriors.indexOf(event.target.name), 1);
                }
            }
            else if (type == "outdooramenities") {
                if (this.selectedOutDoorAmenities.indexOf(event.target.name) > -1) {
                    this.selectedOutDoorAmenities.splice(this.selectedOutDoorAmenities.indexOf(event.target.name), 1);
                }
            }
            else if (type == "parkings") {
                if (this.selectedParkings.indexOf(event.target.name) > -1) {
                    this.selectedParkings.splice(this.selectedParkings.indexOf(event.target.name), 1);
                }
            }
            else if (type == "roofs") {
                if (this.selectedRoofs.indexOf(event.target.name) > -1) {
                    this.selectedRoofs.splice(this.selectedRoofs.indexOf(event.target.name), 1);
                }
            }
            else if (type == "views") {
                if (this.selectedViews.indexOf(event.target.name) > -1) {
                    this.selectedViews.splice(this.selectedViews.indexOf(event.target.name), 1);
                }
            }
        }
    }

    dismiss() {
        if (this.property.Id) {
            $("#addressmodal").modal('hide');
        }
        else {
            this.router.navigate(['/']);
        }
    }
}
