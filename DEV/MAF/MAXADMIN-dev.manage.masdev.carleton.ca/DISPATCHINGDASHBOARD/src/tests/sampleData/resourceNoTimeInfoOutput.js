const resourceNoTimeInfoOutput = [
  {
    Body: [
      {
        Items: [
          {
            Resource: 'Andrew Porter',
            'Resource type': '<div>CARP <p>FIRSTCLASS</p></div>',
            Run: [
              {
                Class: 'AcceptedSlot',
                Tip: '{"duration":"0:00","wonum":"","priority":"","address":"","description":"","wostatus":"APPR","worktype":"","start":"","end":"","fnlconstraint":""}',
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

export default resourceNoTimeInfoOutput;
