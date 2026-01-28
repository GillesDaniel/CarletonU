/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2021,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

IbmSilentPrint=app.trustedFunction(function(printerName)
   {
      app.beginPriv();
      pp = this.getPrintParams();
      pp.printerName = printerName;
      pp.interactive = pp.constants.interactionLevel.automatic;
      this.print({bUI: false, bSilent: true, bShrinkToFit: true, printParams: pp});
      this.closeDoc();
      app.endPriv();
   }
)
