/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import relatedrecwo from "./relatedrecwo-json-data";

it('sample data loads', () => {
  // we are just validating that all the data loads and is not null
  expect(relatedrecwo).not.toBeNull();
});
