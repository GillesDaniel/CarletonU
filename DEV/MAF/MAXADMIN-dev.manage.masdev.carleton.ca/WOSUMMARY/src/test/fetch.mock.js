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

const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = (query) =>
  {
      if(query.indexOf("mxapiprop?oslc.where=propname") !== -1) {
        return Promise.resolve({
          json: () => Promise.resolve({
            "member": [
            {"propname": "RBA.WO.STATUSMAP"},
            {"propname": "RBA.WO.STATUSMAP.WOTYPEISEM"}
          ]})
        });  
      } else if(query.indexOf("wsmethod:getProperties&propNames=RBA.WO.STATUSMAP.WOTYPEISEM") !== -1) {
        return Promise.resolve({
          json: () => Promise.resolve(global.target_wotypeisem)
        });  
      } else if(query.indexOf("oslc.select=wonum,description,location,cond.WOTYPEISEM") !== -1) {
        return Promise.resolve({
          json: () => Promise.resolve({
            "member" : [
            {
            "wotypeisem": 1,
            "wonum": "1201"
            }]
          })
        });  
      }
    }
})

afterAll(() => {
  global.fetch = unmockedFetch
})
