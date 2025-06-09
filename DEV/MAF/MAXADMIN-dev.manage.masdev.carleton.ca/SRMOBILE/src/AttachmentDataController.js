/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
class AttachmentDataController {
	
	onDatasourceInitialized(ds, owner, app) {
		this.datasource = ds;
		this.owner = owner;
		this.app = app;
	}



	async onAfterLoadData(ds, items) {
        let srDetailsPage = this.app.findPage("srDetails");
        srDetailsPage.state.doclinksCount = items.length;
        //This informs the SRDetailsController.pageResumed that doclinksCount must not be updated
        srDetailsPage.params.doclinksCountOverridden = true;
        this.app.state.refreshActiveRequests = true;
    }

}

export default AttachmentDataController;
