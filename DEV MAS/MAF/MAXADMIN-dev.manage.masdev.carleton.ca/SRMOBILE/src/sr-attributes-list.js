/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

let id = 0;
const data = {
  items: [
      {
        _id: id++,
        attrid: "Details",
        label: "Details",
        value: "srdescription",
        desc: "",
        requiredstate: "detailrequiredState",
        closehide: true,
        showvaluefield: false,
        showbutton1field: true,
        showdescfield: true,
        viewindex: "1"
      },
      {
        _id: id++,
        attrid: "ContactPerson",
        label: "Contact person",
        value: "contactdetail",
        desc: "",
        requiredstate: "contactrequiredState",
        closehide: true,
        showvaluefield: false,
        showbutton1field: true,
        showdescfield: true,
        viewindex: "2"
      },
      {
        _id: id++,
        attrid: "Location",
        label: "Location",
        value: "location",
        desc: "locationdesc",
        requiredstate: "locationrequiredState",
        showvaluefield: false,
        showbutton1field: true,
        showdescfield: false,
        viewindex: "3"
      },
      {
        _id: id++,
        attrid: "Asset",
        label: "Asset",
        value: "assetnum",
        desc: "assetdesc",
        requiredstate: "assetrequiredState",
        showvaluefield: false,
        showbutton1field: true,
        showdescfield: false,
        viewindex: "4"
      },
      {
        _id: id++,
        attrid: "ServiceAddress",
        label: "Service address",
        value: "formattedaddress",
        requiredstate: "addressrequiredState",
        showvaluefield: false,
        showbutton1field: true,
        showdescfield: false,
        viewindex: "5"
      },
      {
        _id: id++,
        attrid: "Attachment",
        label: "Attachments",
        value: "",
        desc: "",
        requiredstate: false,
        closehide: true,
        showvaluefield: true,
        showbutton1field: false,
        showdescfield: true,
        viewindex: "6"
      },
  ]
};

export default data;
