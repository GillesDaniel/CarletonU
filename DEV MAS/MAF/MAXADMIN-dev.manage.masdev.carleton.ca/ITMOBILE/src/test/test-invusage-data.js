/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
const data = {
  member: [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      txfrreqship: "ORG",
      orgid: "EAGLENA",
      siteid: "BEDFORD",
      location: "CENTRAL",
      status: "ENTERED",
      usetype: "ISSUE",
      usetype_maxvalue: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      invuseline: [
        {
          invuselinenum: "1",
          itemnum: "0-0031",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          requestnum: "1001",
          siteid: "BEDFORD",
          _rowstamp: "1234",
          item: [
            {
              lottype: "LOT",
              lottype_maxvalue: "LOT",
            },
          ],
          invreserve: [
            {
              requestedby: "MAXADMIN",
              requestnum: "1001",
              item: [
                {
                  rotating: false,
                  conditionenabled: false,
                },
              ],
              requireddate: "2023-08-11T10:13:02+08:00",
              siteid: "BEDFORD",
            },
          ],
          invuselinesplit: [
            {
              autocreated: true,
              contentuid: "afasfaNdsff",
              quantity: 3,
              frombin: "abc",
              invuselinesplitid: 1234,
              anywhererefid: 1234,
              _rowstamp: "123",
              _blkid: 1234,
            },
            {
              autocreated: false,
              contentuid: "afasfaNdsff",
              quantity: 3,
              frombin: "abc",
              invuselinesplitid: 1234,
              anywhererefid: 1234,
              _rowstamp: "123",
              _blkid: 1235,
            },
          ],
        },
        {
          invuselinenum: "2",
          itemnum: "0-0032",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          siteid: "BEDFORD",
          _rowstamp: "1235",
          item: [
            {
              lottype: "LOT",
              lottype_maxvalue: "LOT",
            },
          ],
          invreserve: [
            {
              requestedby: "MAXADMIN",
              requestnum: "1001",
              item: [
                {
                  rotating: false,
                  conditionenabled: false,
                },
              ],
              workorder: [
                {
                  wogroup: "1202",
                  taskid: "10",
                },
              ],
              requireddate: "2023-08-11T10:13:02+08:00",
              siteid: "BEDFORD",
            },
          ],
          invuselinesplit: [],
        },
      ],
      lotnum: "123",
      lottype: "lot",
      lottype_maxvalue: "LOT",
      binnum: "123",
    },

    {
      invuseid: 2,
      invusenum: "333",
      description: "Item test",
      txfrreqship: "ORG",
      orgid: "EAGLENA",
      siteid: "BEDFORD",
      location: "CENTRAL",
      status: "ENTERED",
      usetype: "ISSUE",
      usetype_maxvalue: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT2JE",
      invuseline: [
        {
          invuselinenum: "1",
          itemnum: "0-003771",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          usetype_maxvalue: "RETURN",
          requestnum: "1001",
          siteid: "BEDFORD",
          _rowstamp: "1234",
          item: [
            {
              lottype: "LOT",
              lottype_maxvalue: "LOT",
            },
          ],
          invreserve: [
            {
              requestedby: "MAXADMIN",
              requestnum: "1001",
              item: [
                {
                  rotating: false,
                  conditionenabled: false,
                },
              ],
              workorder: [
                {
                  wogroup: "1202",
                  taskid: "10",
                },
              ],
              requireddate: "2023-08-11T10:13:02+08:00",
              siteid: "BEDFORD",
            },
          ],
          invuselinesplit: [
            {
              autocreated: true,
              contentuid: "afasfaNdsff",
              quantity: 3,
              frombin: "abc",
              invuselinesplitid: 1234,
              _rowstamp: "123",
              _blkid: 1234,
            },
            {
              autocreated: false,
              contentuid: "afasfaNdsff",
              quantity: 3,
              frombin: "abc",
              invuselinesplitid: 1234,
              _rowstamp: "123",
              _blkid: 1235,
            },
          ],
        },
        {
          invuselinenum: "2",
          itemnum: "0-0032888",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          siteid: "BEDFORD",
          _rowstamp: "1235",
          item: [
            {
              lottype: "LOT",
              lottype_maxvalue: "LOT",
            },
          ],
          invreserve: [
            {
              requestedby: "MAXADMIN",
              requestnum: "1001",
              item: [
                {
                  rotating: false,
                  conditionenabled: false,
                },
              ],
              workorder: [
                {
                  wogroup: "1202",
                  taskid: "10",
                },
              ],
              requireddate: "2023-08-11T10:13:02+08:00",
              siteid: "BEDFORD",
            },
          ],
          invuselinesplit: [],
        },
      ],
      lotnum: "123",
      lottype: "lot",
      lottype_maxvalue: "LOT",
      binnum: "123",
    },

    {
      invuseid: 3,
      invusenum: "4444",
      description: "Item test",
      txfrreqship: "ORG",
      orgid: "EAGLENA",
      siteid: "BEDFORD",
      location: "CENTRAL",
      status: "ENTERED",
      usetype: "TRANSFER",
      usetype_maxvalue: "TRANSFER",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT2JE",
      invuseline: [
        {
          invuselinenum: "1",
          itemnum: "0-003771",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          usetype_maxvalue: "ITEM",
          requestnum: "1001",
          siteid: "BEDFORD",
          _rowstamp: "1234",
          item: [
            {
              lottype: "LOT",
              lottype_maxvalue: "LOT",
            },
          ],
          invreserve: [
            {
              requestedby: "MAXADMIN",
              requestnum: "1001",
              item: [
                {
                  rotating: false,
                  conditionenabled: false,
                },
              ],
              requireddate: "2023-08-11T10:13:02+08:00",
              siteid: "BEDFORD",
            },
          ],
          invuselinesplit: [
            {
              autocreated: true,
              contentuid: "afasfaNdsff",
              quantity: 3,
              frombin: "abc",
              invuselinesplitid: 1234,
              _rowstamp: "123",
              _blkid: 1234,
            },
            {
              autocreated: false,
              contentuid: "afasfaNdsff",
              quantity: 3,
              frombin: "abc",
              invuselinesplitid: 1234,
              _rowstamp: "123",
              _blkid: 1235,
            },
          ],
        },
        {
          invuselinenum: "2",
          itemnum: "0-0032888",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          siteid: "BEDFORD",
          _rowstamp: "123D5",
          requestnum: "123",
          item: [
            {
              lottype: "LOT",
              lottype_maxvalue: "LOT",
            },
          ],
          invreserve: [
            {
              requestedby: "MAXADMIN",
              requestnum: "1001",
              item: [
                {
                  rotating: false,
                  conditionenabled: false,
                },
              ],
              workorder: [
                {
                  wogroup: "1202",
                  taskid: "10",
                },
              ],
              requireddate: "2023-08-11T10:13:02+08:00",
              siteid: "BEDFORD",
            },
          ],
          invuselinesplit: [],
        },
      ],
      lotnum: "123",
      lottype: "lot",
      lottype_maxvalue: "LOT",
      binnum: "123",
    },

    {
      invuseid: 5,
      invusenum: "55",
      description: "Item test",
      txfrreqship: "ORG",
      orgid: "EAGLENA",
      siteid: "BEDFORD",
      location: "CENTRAL",
      status: "ENTERED",
      usetype: "ISSUE",
      usetype_maxvalue: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT2JE",
      invuseline: [
        {
          invuselinenum: "1",
          itemnum: "0-XXX",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          usetype_maxvalue: "ITEM",
          siteid: "BEDFORD",
          _rowstamp: "1D234",
          enteredastask: true,
          workorder: [
            {
              wonum: "1400",
              taskid: "20",
            },
          ],
        },
        {
          invuselinenum: "2",
          itemnum: "0-CCC",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          siteid: "BEDFORD",
          _rowstamp: "123D5",
        },
      ],
      lotnum: "123",
      lottype: "lot",
      lottype_maxvalue: "LOT",
      binnum: "123",
    },

    {
      invuseid: 4,
      invusenum: "144",
      description: "Item test",
      txfrreqship: "ORG",
      orgid: "EAGLENA",
      siteid: "BEDFORD",
      location: "CENTRAL",
      status: "ENTERED",
      usetype: "TRANSFER",
      usetype_maxvalue: "TRANSFER",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT2JE",
      invuseline: [
        {
          invuselinenum: "1",
          itemnum: "0-XXX",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          usetype_maxvalue: "ITEM",
          siteid: "BEDFORD",
          _rowstamp: "1D234",
        },
        {
          invuselinenum: "2",
          itemnum: "0-CCC",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          siteid: "BEDFORD",
          _rowstamp: "123D5",
        },
      ],
      lotnum: "123",
      lottype: "lot",
      lottype_maxvalue: "LOT",
      binnum: "123",
    },

    {
      invuseid: 5,
      invusenum: "555",
      description: "Item test",
      txfrreqship: "ORG",
      orgid: "EAGLENA",
      siteid: "BEDFORD",
      location: "CENTRAL",
      status: "ENTERED",
      usetype: "MIXED",
      usetype_maxvalue: "MIXED",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT2JE",
      invuseline: [
        {
          invuselinenum: "1",
          itemnum: "0-XXX",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          usetype_maxvalue: "ITEM",
          siteid: "BEDFORD",
          _rowstamp: "1D234",
        },
        {
          invuselinenum: "2",
          itemnum: "0-CCC",
          itemtype: "ITEM",
          linetype: "ITEM",
          linetype_maxvalue: "ITEM",
          siteid: "BEDFORD",
          _rowstamp: "123D5",
        },
      ],
      lotnum: "123",
      lottype: "lot",
      lottype_maxvalue: "LOT",
      binnum: "123",
    },
  ],
};
export default data;
