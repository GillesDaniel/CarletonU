/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
const data = {
  member: [
    {
      description: "Franklin, MA",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/0-41",
      addresscode: "FRANKLIN",
    },
    {
      description: "Lexington, MA",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/1-42",
      addresscode: "LEXINGTON",
    },
    {
      description: "Woburn, MA",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/2-43",
      addresscode: "WOBURN",
    },
    {
      description: "IT only site",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/3-1",
      addresscode: "MCLEAN",
    },
    {
      description: "Main addr Bedford MA Site of EAGLE Inc. NA",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/4-2",
      addresscode: "BEDFORDMAIN",
    },
    {
      description: "Hartford CT, branch office",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/5-4",
      addresscode: "HARTFORD",
    },
    {
      description: "Nashua branch office",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/6-6",
      addresscode: "NASHUA",
    },
    {
      description: "Eagle SA Headquarters, Chile",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/7-7",
      addresscode: "CHILEHDQTRS",
    },
    {
      description: "Eagle SA, Concepcion Site",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/8-9",
      addresscode: "CONCEPCION",
    },
    {
      description: "MEXICO BRANCH OF EAGLENA",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/9-10",
      addresscode: "LAREDO",
    },
    {
      description: "TEXAS SITE OF EAGLENA",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/10-11",
      addresscode: "TEXAS",
    },
    {
      description: "European HQ - Woking Site",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/11-12",
      addresscode: "WOKING",
    },
    {
      description: "Main addr DENVER CO Site of EAGLE Inc. NA",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/12-13",
      addresscode: "DENVERMAIN",
    },
    {
      description: "Valley Forge Admin and data center",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/13-47",
      addresscode: "VF-ADMIN",
    },
    {
      description: "Valley Forge Customer breifing center",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/14-48",
      addresscode: "VF-BC",
    },
    {
      description: "Barton Keep Bed & Breakfast",
      href: "oslc/os/mxapishipment/zombie/getlist~shipto/15-49",
      addresscode: "VF-BK-B&B",
    },
  ],
  href: "oslc/os/mxapishipment/zombie/getlist~shipto",
  responseInfo: {
    schema: {
      resource: "BILLTOSHIPTO",
      pk: ["addresscode", "orgid", "siteid"],
      title: "BILLTOSHIPTO",
      type: "object",
      properties: {
        _imglibref: {
          type: "string",
        },
        description: {
          searchType: "TEXT",
          subType: "ALN",
          title: "Description",
          persistent: true,
          type: "string",
          remarks:
            "Describes the address code, for example, Nashua, New Hampshire main office.",
          maxLength: 100,
        },
        _id: {
          type: "string",
        },
        addresscode: {
          searchType: "WILDCARD",
          subType: "UPPER",
          title: "Address",
          persistent: true,
          type: "string",
          hasList: true,
          remarks:
            "The identifier of the address that is associated with the current record.",
          maxLength: 30,
        },
      },
      required: ["addresscode"],
    },
    totalPages: 1,
    href: "oslc/os/mxapishipment/zombie/getlist~shipto?oslc.select=address.description--description%2Caddresscode&oslc.pageSize=100&searchAttributes=address.description&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
    totalCount: 16,
    pagenum: 1,
  },
};
export default data;
