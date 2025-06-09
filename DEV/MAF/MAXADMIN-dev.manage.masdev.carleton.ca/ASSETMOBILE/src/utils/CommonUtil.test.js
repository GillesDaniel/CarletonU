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

import CommonUtil from './CommonUtil';
import { JSONDataAdapter, Datasource, Application } from '@maximo/maximo-js-api';

const defaultDs = {
    member: [
        {
            _rowstamp: "239020",
            itemsetid: "SET1",
            href: "oslc/os/mxapiorganization/_RUFHTEVOQQ--",
            orgid: "EAGLENA",
            mobilemaxvars: [
                {
                    maxvarsid: 2232,
                    orgid: "EAGLENA",
                    varname: "COORDINATE",
                    vartype: "ORG",
                    varvalue: "XY"
                },
                {
                    maxvarsid: 2233,
                    orgid: "EAGLENA",
                    varname: "COORDINATE",
                    vartype: "SITE",
                    varvalue: "YZ"
                }
            ]
        }
    ]
};

describe('CommonUtil', () => {
    it('verify mobilemaxvars works as expected', async () => {
        const app = new Application();
        
        const defDS = newStatusDatasource(defaultDs, 'defaultSetDs');
        app.registerDatasource(defDS);
        await defDS.load();
        
        let mobMaxVar = CommonUtil.filterMobileMaxvars("COORDINATE", defDS);
        expect(mobMaxVar).toBeTruthy();
        expect(mobMaxVar.length).toBeGreaterThan(0);
        expect(mobMaxVar[0].varname).toBe("COORDINATE");
        expect(mobMaxVar[0].varvalue).toBe("YZ");
    });
});


function newStatusDatasource(data = defaultDs, name = 'defaultSetDs') {
    const da = new JSONDataAdapter({
        src: data,
        items: 'member',
    });
    const ds = new Datasource(da, {
        idAttribute: 'value',
        name: name
    });
    return ds;
}
