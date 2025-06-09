/*
 * Licensed Materials - Property of IBM
 * 5737-M66, 5900-AAA
 * (C) Copyright IBM Corp. 2020, 2021 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */


import osCacheTestData from './oscache';

it('sample data loads', () => {
  // we are just validating that all the data loads and is not null
  expect(osCacheTestData).not.toBeNull();
});
