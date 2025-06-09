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
import PersonDataController from './PersonDataController.js';
import {Application, Page} from '@maximo/maximo-js-api';



it('should retrieve proper value in computedValue', async () => {
  const controller = new PersonDataController();
  const app = new Application();
  const page = new Page({name: 'createSR'});
  app.registerPage(page);
  app.registerController(controller);
  app.initialize();

  let person = {
    personid: 'FITZ',
    displayname: "Fitz Cameron",
  };
  expect(controller.computedValue(person)).toEqual("Fitz Cameron");

  person = {
    personid: 'PERSONIDJOAO',
    displayname: null
  };
  expect(controller.computedValue(person)).toEqual("PERSONIDJOAO");

  person = {
    personid: 'PERSONIDJOAO2',
    displayname: ""
  };
  expect(controller.computedValue(person)).toEqual("PERSONIDJOAO2");

  person = {
    personid: 'PERSONIDJOAO3',
  };
  expect(controller.computedValue(person)).toEqual("PERSONIDJOAO3");
});
