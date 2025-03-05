/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

const data = 
{
    items: [
    {
        _id:0,
        status:'WAPPR'
    },
    {
        _id:1,
        status:'APPR'
    },
    {        
        _id:2,
        status:'INPG'
    }
],
schema: {
    $schema: 'http://json-schema.org/draft-04/schema#',
    resource: 'TEST',
    description:
      "Maximo API's  Work Order with Plans and Reservations Definition",
    pk: ['_id'],
    title: 'CreateWizard',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: 'status'
      }
    }
  }
};

export default data;
