/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
const data = {
  member: [
    {
      description: "Software License Pool",
      siteid: "BEDFORD",
      location: "SOFTWARE",
      href: "oslc/os/mxapiinvbal/zombie/getlist~location/0-259",
      orgid: "EAGLENA",
    },
    {
      description: "IT hardware components",
      siteid: "BEDFORD",
      location: "HARDWARE",
      href: "oslc/os/mxapiinvbal/zombie/getlist~location/1-258",
      orgid: "EAGLENA",
    },
    {
      description: "Machine Shop Storeroom",
      siteid: "BEDFORD",
      location: "MACHSHOP",
      href: "oslc/os/mxapiinvbal/zombie/getlist~location/2-42",
      orgid: "EAGLENA",
    },
    {
      description: "Packaging Dept. Storeroom",
      siteid: "BEDFORD",
      location: "PKG",
      href: "oslc/os/mxapiinvbal/zombie/getlist~location/3-41",
      orgid: "EAGLENA",
    },
    {
      description: "Garage Storeroom",
      siteid: "BEDFORD",
      location: "GARAGE",
      href: "oslc/os/mxapiinvbal/zombie/getlist~location/4-38",
      orgid: "EAGLENA",
    },
    {
      description: "Central Storeroom",
      siteid: "BEDFORD",
      location: "CENTRAL",
      href: "oslc/os/mxapiinvbal/zombie/getlist~location/5-39",
      orgid: "EAGLENA",
    },
    {
      siteid: "BEDFORD",
      location: "HWMCLEAN",
      href: "oslc/os/mxapiinvbal/zombie/getlist~location/6-283",
      orgid: "EAGLENA",
    },
  ],
  href: "oslc/os/mxapiinvbal/zombie/getlist~location",
  responseInfo: {
    totalPages: 1,
    href: "oslc/os/mxapiinvbal/zombie/getlist~location?oslc.select=description%2Clocation%2Csiteid%2Corgid&oslc.pageSize=100&oslc.where=type%3D%22STOREROOM%22%20and%20siteid%3D%22BEDFORD%22&searchAttributes=description%2Clocation%2Csiteid%2Corgid&collectioncount=1&ignorecollectionref=1&relativeuri=1&lean=1&internalvalues=1&checkesig=1",
    totalCount: 7,
    pagenum: 1,
  },
};
export default data;
