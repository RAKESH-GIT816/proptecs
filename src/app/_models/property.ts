export class Property {
    Id: number;
    UserId: number;
    StreetAddress: string;
    City: string;
    State: string;
    ZipCode: string;
    AddedDate: Date;
    ApprovedDate: Date;
    ShowAddress: boolean;
    Status: number;
    Latitude: number;
    Longitude: number;
}

export class PropertyDetails {
    Id: number;
    PropertyId: number;
    PropertyType: string;
    Bedrooms: number;
    Bathrooms: number;
    YearBuilt: number;
    LotSize: number;
    LotUnits: string;
    FinishedSqFt: number;
    GarageSqFt: number;
    BasementSqFt: number;
    MonthlyHOADues: number;
    PropertyDetails: string;
    RepairDetails: string;
    Appliances: string;
    BasementDetails: string;
    RoomDetails: string;
    FloorCovering: string;
    IndoorFeatures: string;
    CoolingTypes: string;
    HeatingTypes: string;
    HeatingFuels: string;
    BuildingAmenities: string;
    ArchitecturalStyles: string;
    Exteriors: string;
    OurdoorAmenities: string;
    Parking: string
    Roofs: string;
    Views: string;
    IsUnderconstruction: boolean;
}

export class PropertyEquity {
    Id: number;
    PropertyId: number;
    PurchasePrice: number;
    WholesaleFee: number;
    MinimumStartBid: number;
    WholequityFee: number;
    ProfitfromSale: number;
    ARV: number;
    EstimatedEscrowCost: number;
    RepairCost: number;
    AuctionStartDate: Date;
    AuctionStartTime: string;
    AuctionEndDate: Date;
    AuctionEndTime: string;
    agreeTerms: boolean;
}

export class PropertyPhotosAndVideos {
    Id: number;
    PropertyId: number;
    FileName: string;
    FilePath: string;
    IsMainPhoto: boolean;
    PhotoDescription: string;
    UploadedDate: Date;
}
export class PropertyEquityOtherCost {
  Id: number;
  PropertyId: number;
  CostName: string;
  CostValue: number;
}

export class PropertySupportingDocs {
  Id: number;
  PropertyId: number;
  FileName: string;
  FilePath: string;
  FileType: string;
  UploadedDate: Date;
}




export class PropertyBid {
  Id: number;
  PropertyId: number;
  UserId: number;
  BidAmount: number;
  WalletId: number;
}

export class SaveFavouriteProperty {
  Id: number;
  PropertyId: number;
  UserId: number;
  SavedDate: Date;
}
export class PropertyBidHistory {
  BidId: number;
  BidAmount: string;
  BidDate: Date;
  UserId: number;
  UserName: string;
  UserJoinDate: Date;
  userProfileImageURL: string;
}
