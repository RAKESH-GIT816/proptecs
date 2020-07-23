import { environment } from './../environments/environment';
export const AppConstant = Object.freeze({


    API_ENDPOINT: environment.API_ENDPOINT,
    APPLICATIONURL: environment.APPLICATIONURL,


    API_URL: {
        USER:
        {
            REGISTER: "register",
            Login: "login",
            SAVEWALLET: "u/supc", 
            DELETEWALLET: "u/dupc",
            GETUSERBYID: "u/gudbid",
            PUTUSERDETAILS: "u/uud",
            BIDPROPERTY: "bp",
            ACTIVEBIDS: "u/guavb",
            UPDATEEMAIL: "u/uue",
            UPDATEPASSWORD: "u/uup",
            GETUSERSAVEDPROPERTIES: "u/gusp",
            GETBUYERHISTORY: "u/gbh",
            ACCEPTEDBIDS: "u/guadb",
            VERIFYMOBILE: "mobile/verify",
            CHECKUSERNAMEEXISTS: "cene" ,
            CHECKEMAILEXISTS: "cee",
            UPLOADPROFILEPHOTO: "u/upp",
            GETSELLERACTIVEOFFERS: "u/gsavo",
            GETSELLERACCEPTEDOFFERS: "u/gsado",
            GETPROPERTYBIDS: "u/gpb",
            ACCEPTEDBID: "u/ab"

        },
        PROPERTY:
        {
            SEARCH: "sp",
            GETPROPDETAILSFORBID: "gpdfb",
            GETPROPDETAILS: "p/gpbyid",
            SAVEFAVOURITEPROPERTY: "p/sfp",
            UNSAVEFAVOURITEPROPERTY: "p/usfp",
            REMOVEPROPERTYDOC: "p/rpd",
            SAVEWHOLESALEPROFIT: "p/swp",
            SAVEDPROPERTIES: "p/spa",
            SAVEDPROPERTIESDETAILS: "p/spd",
            PROPERTYFILEUPLOAD: "p/upd",
            SAVEOTHERCOSTDETAILS: 'p/socd',
            SAVELISTINGDETAILS: "p/sld",
            GETPROPERTYVIDEOS: "p/gppv",
            REMOVEPROPERTYPHOTO: "p/rpp",
            SAVEDPROPERTYANDVIDEOS: "p/sppv",
            UPDATEPROPERTYSTATUS: 'p/ups',
            GETSELLERACTIVEOFFERS: "u/gsavo",
            GETSELLERHISTORY: "u/gsh",
            DELETEPROPERTY: "p/rp",
            GETPROPERTYDETAILSFROMHOUSECANARY: "p/gpdfhc",
            UPLOADPROPERTYPHOTOSANDVIDEOS: "p/uppv",
            getgetnoofbids: "/u/gpb/",

        },
    }
})