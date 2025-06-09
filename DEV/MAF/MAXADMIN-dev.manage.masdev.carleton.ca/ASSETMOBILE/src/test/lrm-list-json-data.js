/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

let assetLrm = {
  member: [
    {
      _rowstamp: "148320",
      lrm: "MILES",
      description: "Absolute measure in miles",
      href: "oslc/os/mxapilinearrefmethod/_TUlMRVM-",
    },
    {
      _rowstamp: "148321",
      lrm: "MILEPOINT",
      description: "Absolute measure in miles",
      href: "oslc/os/mxapilinearrefmethod/_TUlMRVBPSU5U",
    },
    {
      _rowstamp: "148322",
      lrm: "FEET TO CM",
      description: "Display in Feet - Store also in Centimeters",
      href: "oslc/os/mxapilinearrefmethod/_RkVFVCBUTyBDTQ--",
    },
    {
      _rowstamp: "148323",
      lrm: "KILOMETERPOINT",
      description: "Absolute measure in kilometers",
      href: "oslc/os/mxapilinearrefmethod/_S0lMT01FVEVSUE9JTlQ-",
    },
    {
      _rowstamp: "148324",
      lrm: "FEET",
      description: "Absolute measure in feet",
      href: "oslc/os/mxapilinearrefmethod/_RkVFVA--",
    },
    {
      _rowstamp: "148325",
      lrm: "KILOMETERS",
      description: "Absolute measure in kilometers",
      href: "oslc/os/mxapilinearrefmethod/_S0lMT01FVEVSUw--",
    },
  ],
  href: "oslc/os/mxapilinearrefmethod",
  responseInfo: {
    schema: {
      resource: "MXAPILINEARREFMETHOD",
      description: "Maximo API for linear refrence method",
      pk: ["lrm"],
      title: "LINEARREFMETHOD",
      type: "object",
      $ref: "oslc/jsonschemas/mxapilinearrefmethod",
      properties: {
        _rowstamp: {
          type: "string",
        },
        localref: {
          type: "string",
        },
        _imagelibref: {
          type: "string",
        },
        lrm: {
          searchType: "EXACT",
          subType: "UPPER",
          title: "LRM",
          persistent: true,
          type: "string",
          remarks:
            "Name of this linear referencing method.  A linear referencing method specifies the units of measure (for measures and offsets) and the reference points (for offsets) to locate points on or near a linear asset.",
          maxLength: 25,
        },
        description: {
          searchType: "WILDCARD",
          subType: "ALN",
          title: "Description",
          persistent: true,
          type: "string",
          remarks: "Description",
          maxLength: 100,
        },
        href: {
          type: "string",
        },
        _id: {
          type: "string",
        },
      },
      required: ["lrm"],
    },
    totalPages: 1,
    href: "oslc/os/mxapilinearrefmethod?oslc.select=lrm%2Cdescription&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
    totalCount: 6,
    pagenum: 1,
  },
};

export default assetLrm;
