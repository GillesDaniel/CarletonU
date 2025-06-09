const resourceNoNameOutput = [
  {
    Body: [
      {
        Items: [
          {
            Resource: 'PORTER',
            Run: [
              {
                Class: 'InProgressSlot',
                Duration: 2,
                Start: 1692540000000,
                Tip: '{"duration":"2:00","wonum":"BSTB1226","priority":2,"address":"1251 Balmoral Street","description":"Exhaust leak","wostatus":"INPRG","worktype":"CM","start":"09/20/2023 10:00 AM","end":"09/20/2023 10:00 AM","fnlconstraint":"09/20/2023 10:00 AM"}',
                end: '2023-08-21T14:00:00+00:00',
                href: null,
                resourceid: 'PORTER',
                resourcename: 'Andrew Porter',
                shiftnum: 'DAY',
                worksite: 'BEDFORD',
              },
            ],
            Shift: 'DAY',
            Utilization: '78%',
          },
          {
            Resource: 'BSTOHL1',
            Run: [
              {
                Duration: 6,
                Start: 1692540000000,
                href: null,
                resourceid: 'BSTOHL1',
                resourcename: 'Over Head Line Crew 1',
                shiftnum: 'DAY',
              },
            ],
            Shift: 'DAY',
            Utilization: '40%',
          },
        ],
      },
    ],
  },
];

export default resourceNoNameOutput;
