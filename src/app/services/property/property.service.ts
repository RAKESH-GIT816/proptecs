import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConstant } from '../../appconstant'

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  apiendpoint: any
  SearchPropertiesUrl: any
  PropertyDetailsForBid: any
  PropertyDetailsUrl: any
  saveFavPropertyUrl: any
  unsaveFavPropertyUrl: any
  removepropertydocUrl: any
  savewholesaleUrl: any
  savedpropertiesurl: any;
  SavedPropertyDetailsurl: any
  saveothercostdetails: any
  savelistingdetails: any
  getpropertvideos: any;
  removepropertyphoto: any;
  savedpropertyandvideos: any;
  updatepropertystatus: any;
  getsellerallhistory: any;
  getselleractiveoffers: any;
  savePhotosAndVideos: any;
  getgetnoofbids: any;

  constructor(private http: HttpClient) {
    this.apiendpoint = AppConstant.API_ENDPOINT;
    this.SearchPropertiesUrl = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.SEARCH;
    this.PropertyDetailsForBid = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.GETPROPDETAILSFORBID;
    this.PropertyDetailsUrl = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.GETPROPDETAILS;
    this.saveFavPropertyUrl = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.SAVEFAVOURITEPROPERTY;
    this.unsaveFavPropertyUrl = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.UNSAVEFAVOURITEPROPERTY;
    this.removepropertydocUrl = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.REMOVEPROPERTYDOC;
    this.savewholesaleUrl = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.SAVEWHOLESALEPROFIT;
    this.savedpropertiesurl = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.SAVEDPROPERTIES;
    this.SavedPropertyDetailsurl = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.SAVEDPROPERTIESDETAILS;
    this.saveothercostdetails = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.SAVEOTHERCOSTDETAILS;
    this.savelistingdetails = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.SAVELISTINGDETAILS;
    this.getpropertvideos = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.GETPROPERTYVIDEOS;
    this.removepropertyphoto = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.REMOVEPROPERTYPHOTO;
    this.savedpropertyandvideos = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.SAVEDPROPERTYANDVIDEOS;
    this.updatepropertystatus = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.UPDATEPROPERTYSTATUS;
    this.getsellerallhistory = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.GETSELLERHISTORY;
    this.getselleractiveoffers = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.GETSELLERACTIVEOFFERS;
    this.savePhotosAndVideos = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.UPLOADPROPERTYPHOTOSANDVIDEOS;
    this.getgetnoofbids = AppConstant.API_ENDPOINT + AppConstant.API_URL.PROPERTY.getgetnoofbids;
  }

  searchProperties(data) {
    const params = new HttpParams()
      .set('city', data.city)
      .set('state', data.state)
      .set('zipcode', data.zipcode)
      .set('searchtext', data.searchtext)
    return this.http.get(this.SearchPropertiesUrl, { params });
  }


  getPropertyDetailsForBid(propertyId, userid) {
    const params = new HttpParams()
      .set('propertyId', propertyId)
    return this.http.get(this.PropertyDetailsForBid, { params });
  }
  getPropertyDetails(propertyId) {
    const params = new HttpParams()
      .set('Id', propertyId)
    return this.http.get(this.PropertyDetailsUrl, { params });
  }
  saveFavProperty(propertyId, userid) {
    var temp: any = {
      'PropertyId': propertyId,
      'UserId': userid
    };
    return this.http.post(this.saveFavPropertyUrl, temp);
  }

  unsaveFavProperty(propertyId, userid) {
    var temp: any = {
      'PropertyId': propertyId,
      'UserId': userid
    };
    return this.http.post(this.unsaveFavPropertyUrl, temp);
  }

  deletePropertyDocument(id, proeprtyId, fileName) {
    const params = new HttpParams()
      .set('documentId', id)
      .set('propertyId', proeprtyId)
      .set('fileName', fileName)
    return this.http.delete(this.removepropertydocUrl, { params });
  }

  SaveWholesaleProfit(equity: any) {
    return this.http.post(this.savewholesaleUrl, equity);
  }

  SavePropertyAddress(address: any) {
    return this.http.post(this.savedpropertiesurl, address);
  }

  SavePropertyDetails(details: any) {
    return this.http.post(this.SavedPropertyDetailsurl, details);
  }

  getPropertyDetailsFromHouseCanary(address: string, city: string, state: string, zip: string) {
    return this.http.get('https://api.estated.com/property/v3?token=3ygvIR7iCypPOIIvtnpllikiUxAtn6&address=' + address.replace("%20", "+") + '&city=' + city + '&state=' + state + '&zip=' + zip);
  }

  UploadFiless(request) {

    const formData = new FormData();
    request.forEach(function (d) {
      formData.append('file', d);
    }, this);

    return this.http.post(AppConstant.API_ENDPOINT + 'UploadFiless', formData);

  }
  savePhotosandVideo(details) {
    return this.http.post(this.savePhotosAndVideos, details);
  }

  saveOtherCostDetails(details: any) {
    return this.http.post(this.saveothercostdetails, details);
  }

  saveListingDetails(listingDetails: any) {
    return this.http.post(this.savelistingdetails, listingDetails);
  }


  // getPropertyPhotosAndVideos(id: number) {
  //   return this.http.get(AppSettings.API_ENDPOINT+'Property/GetPropertyPhotosAndVideos?propertyId=' + id, this.jwt()).map((response: Response) => response.json());
  // }

  deletePropertyPhoto(id, proeprtyId, fileName) {

    const params = new HttpParams()
      .set('photoId', id)
      .set('propertyId', proeprtyId)
      .set('fileName', fileName)
    return this.http.delete(this.removepropertyphoto, { params });
  }




  SavePropertyPhotosAndVideos(details) {
    return this.http.post(this.savedpropertyandvideos, details);
  }


  updatePropertyStatus(property) {
    return this.http.put(this.updatepropertystatus, property);
  }

  getsellerhistory(userid: any) {
    const params = new HttpParams()
    return this.http.get(this.getsellerallhistory, { params });
  }

  getselleractiveproperties(userid: any) {
    const params = new HttpParams()
    return this.http.get(this.getselleractiveoffers, { params });
  }

  // getPropertyDetailsForBid(propertyId, userid) {
  //   const params = new HttpParams()
  //     .set('propertyId', propertyId)
  //   return this.http.get(this.PropertyDetailsForBid, { params });
  // }
  getnoofbids(propertyId: any) {
    const params = new HttpParams()
          .set('propertyId', propertyId)
    return this.http.get(this.getgetnoofbids, { params })
  }

}
