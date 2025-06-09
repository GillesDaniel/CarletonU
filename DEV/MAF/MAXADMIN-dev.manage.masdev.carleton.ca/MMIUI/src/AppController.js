/* eslint-disable no-console */
import {log} from "@maximo/maximo-js-api";
const TAG = "MMIUIApp";

class AppController {
  applicationInitialized(app) {
    this.app = app;
    log.t(TAG, 'MMIUI app is initialized');
  }
   //istanbul ignore next
  onAfterLoadData(datasource,items) {
    //if (datasource.name === 'globaldirds' || datasource.name === 'childdirds' || datasource.name === 'eventtreeds'){
    if (datasource.name === 'eventtreeds'){
      items.forEach(item => {
        var keys = Object.keys(item);
        keys.forEach(key=>{
          if (key.indexOf(':' > -1)) {
            var old_key = key;
            var namespace = key.substring(0,key.indexOf(':')+1);
            var new_key = key.replace(namespace,'');
            if (old_key !== new_key) {
              Object.defineProperty(item, new_key,
                  Object.getOwnPropertyDescriptor(item, old_key));
              //delete item[old_key];
            }
          }
        });     
      });
      log.t(TAG, 'afterLoadData');
    }
  }

  handleGatherLogs(event) {
    this.app.state.logItem = event.item;
  }

  handleCheckServerDetail(event) {
    this.app.state.currentServerId = event.item.identifier;
    this.app.setCurrentPage({name: 'serverdetail', params: {serverIdentifier: event.item.identifier}});
  }

  //istanbul ignore next
  async handleCheckStreamLog() {
    let action = 'streamLog';
    let option = {};
    let resp = await this.app.datasources.serviceds.invokeAction(
      action,
      option
    );
    this.app.state.currentLog = resp;
    this.app.showDialog("displayLog");
  }
}
export default AppController;
