export class User {
    Id: number;
    EmailAddress: string;
    NewEmailAddress: string;
    Password: string;
    FirstName: string;
    LastName: string;
    UserName: string;
    PhoneNumber: string;
    NewPhoneNumber: string;
    CountryCode: string;
    OTP: string;
    CreatedDate: Date;
    LastModifiedDate: Date;
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    ZipCode: string;
    Role: number;
    ProfileImage: string;
    UserAddresses: any = [];
}

export class UserWallet {
  Id: number;
  UserId: number;
  AccountNumber: string;
  AccountName: string;
  CardType: string;
  ExpMonth: number;
  ExpYear: number;
  IsPrimary: boolean;
}
export class UserProperties {
  Id: number;
  StreetAddress: string;
  City: string;
  State: string;
  ZipCode: string;
  filepath: string;
  AuctionEndDate: Date;
  AuctionEndTime: string;
  BidAmount: PaymentCurrencyAmount;
  BidDate:Date;
  IsBidAccepted: boolean;
  BidAcceptedDate:Date;
  BidPosition: number;
}
