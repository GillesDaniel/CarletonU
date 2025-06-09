/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

// istanbul ignore file

// NOTE to use this proxy, just add it to yuor setupProxy.js (import masProxy and then call it with app)

// const masProxy = require('./setupProxy.mas');

// module.exports = function(app) {
//   app.use(
//     proxy('/maximo/**', {
//       target: 'http://localhost:9081/',

//       headers: {
//         MAXAUTH: 'd2lsc29uOndpbHNvbg=='
//       }
//     })
//   );
//   masProxy(app);
// };



// https://github.com/chimurai/http-proxy-middleware


const fixture = {
  '/about': {
    environmentName: 'mymas',
    domain: 'mymas.mycompany.com',
    idp: {
      issuerUrl: 'https://auth.mymas.mycompany.com/',
      authorizationUrl: 'https://auth.mymas.mycompany.com/authorize',
      tokenUrl: 'https://auth.mymas.mycompany.com/token',
      logoutUrl: 'https://auth.mymas.mycompany.com/logout'
    },
    icr: {
      cp: 'docker-na-public.artifactory.swg-devops.com/wiotp-docker-local',
      cpopen: 'docker-na-public.artifactory.swg-devops.com/wiotp-docker-local/cpopen'
    },
    images: {
      pullPolicy: 'Always',
      pullSecretName: 'ibm-entitlement',
      registry: 'docker-na-public.artifactory.swg-devops.com/wiotp-docker-local'
    },
    status: {
      conditions: [
        {
          lastTransitionTime: '2021-04-29T12:51:18Z',
          message: 'Ready',
          reason: 'Ready',
          status: 'True',
          type: 'SystemDatabaseReady'
        },
        {
          lastTransitionTime: '2021-04-29T12:51:18Z',
          message: 'BAS configuration was successfully verified',
          reason: 'Ready',
          status: 'True',
          type: 'BASIntegrationReady'
        },
        {
          lastTransitionTime: '2021-04-29T12:51:18Z',
          message: 'MAS Licensing API endpoint check succeeded',
          reason: 'Ready',
          status: 'True',
          type: 'SLSIntegrationReady'
        },
        {
          lastTransitionTime: '2021-04-29T12:51:18Z',
          message: 'MAS is ready to use',
          reason: 'Ready',
          status: 'True',
          type: 'Ready'
        },
        {
          lastTransitionTime: '2021-04-27T19:37:50Z',
          message: 'Running reconciliation',
          reason: 'Running',
          status: 'True',
          type: 'Running'
        }
      ]
    },
    version: '8.11.6',
    controllerVersion: '8.11.6',
    supportedVersions: [
      '8.11.0',
      '8.11.1',
      '8.11.2',
      '8.11.3',
      '8.11.4',
      '8.11.5',
      '8.11.6',
      '8.12.0'
    ],
    manualCertMgmt: 'True',
    trustDefaultCAs: 'True',
    specification: {
      certManagerNamespace: 'ibm-common-services',
      domain: 'inst1.apps.masrb1.cp.fyre.ibm.com',
      license: {
        accept: true
      },
      settings: {
        dataDictionary: {
          catalog: 'ibm-operator-catalog'
        },
        icr: {
          cp: 'docker-na-public.artifactory.swg-devops.com/wiotp-docker-local',
          cpopen: 'docker-na-public.artifactory.swg-devops.com/wiotp-docker-local/cpopen'
        },
        manualCertMgmt: false
      },
      version: '8.11.6'
    }
  },
  '/profile': {
    user: {
      added: {
        id: 'mas-superuser',
        timestamp: '2020-04-01T16:01:00-03:00'
      },
      updated: {
        id: 'mas-superuser',
        timestamp: '2023-10-16T15:50:19Z'
      },
      sync: {
        status: 'SUCCESS',
        timestamp: '2023-10-16T15:50:19Z'
      },
      _id: 'mas-admin',
      id: 'mas-admin',
      identities: {
        _local: {
          type: 'local',
          forceTokenChange: false
        }
      },
      username: 'mas-admin@ibm.com',
      status: {
        active: true,
        activationUpdateReason: 'account creation',
        expiresAt: '2023-05-15T00:00:00',
        inactivityTimeout: 'P1W',
        activationUpdateTimestamp: '2023-04-15T00:00:00',
        lastActivityTimestamp: '2023-05-25T10:31:16'
      },
      givenName: 'Test',
      familyName: 'Admin',
      displayName: 'Test Admin',
      title: 'Tester',
      emails: [
        {
          value: 'testadmin@ibm.com',
          type: 'Work',
          primary: true
        },
        {
          value: 'testadmin@test.com',
          type: 'Home'
        }
      ],
      phoneNumbers: [
        {
          value: '555-555-5555',
          type: 'Work',
          primary: true
        },
        {
          value: '555-555-4444',
          type: 'Mobile'
        }
      ],
      addresses: [
        {
          streetAddress: '100 Universal City Plaza',
          locality: 'Hollywood',
          region: 'CA',
          postalCode: '91608',
          country: 'USA',
          formatted: '100 Universal City Plaza\nHollywood, CA 91608 USA',
          type: 'Work',
          primary: true
        }
      ],
      owner: 'local',
      groups: ['group1', 'group2', 'group5'],
      entitlement: {
        application: 'NONE',
        admin: 'ADMIN_PREMIUM',
        alwaysReserveLicense: true
      },
      permissions: {
        systemAdmin: true,
        userAdmin: true,
        apikeyAdmin: true
      },
      preferences: {
        locale: {
          language: 'pt',
          country: 'BR'
        },
        timezone: null
      },
      workspaces: {
        mockedworkspace: {
          permissions: {
            workspaceAdmin: true
          },
          url: 'https://api.myenv.mydomain.com/workspaces/mockedworkspace',
          applications: {},
          name: 'Mocked Workspace'
        },
        mockedworkspace2: {
          permissions: {
            workspaceAdmin: true
          },
          url: 'https://api.myenv.mydomain.com/workspaces/mockedworkspace2',
          applications: {}
        }
      },
      applications: {
        iot: {
          sync: {
            state: 'SUCCESS',
            timestamp: '2023-10-16T15:50:19Z'
          }
        },
        health: {
          sync: {
            state: 'SUCCESS',
            timestamp: '2023-10-16T15:50:19Z'
          }
        },
        manage: {
          sync: {
            state: 'SUCCESS',
            timestamp: '2023-10-16T15:50:19Z'
          }
        },
        monitor: {
          sync: {
            state: 'SUCCESS',
            timestamp: '2023-10-16T15:50:19Z'
          }
        },
        predict: {
          sync: {
            state: 'SUCCESS',
            timestamp: '2023-10-16T15:50:19Z'
          }
        },
        visualinspection: {
          sync: {
            state: 'SUCCESS',
            timestamp: '2023-10-16T15:50:19Z'
          }
        },
        assist: {
          sync: {
            state: 'SUCCESS',
            timestamp: '2023-10-16T15:50:19Z'
          }
        },
        optimizer: {
          sync: {
            state: 'SUCCESS',
            timestamp: '2023-10-16T15:50:19Z'
          }
        }
      }
    },
    workspaces: [
      {
        metadata: {
          creationTimestamp: '2023-10-16T15:00:50Z',
          labels: {
            'mas.ibm.com/instanceId': 'mar13',
            'mas.ibm.com/workspaceId': 'mockedworkspace'
          }
        },
        spec: {
          displayName: 'Mocked Workspace'
        },
        status: {
          conditions: [
            {
              lastTransitionTime: '2023-10-16T15:00:50Z',
              message: 'Workspace is ready',
              reason: 'Ready',
              status: 'True',
              type: 'Ready'
            },
            {
              ansibleResult: {
                changed: 4,
                completion: '2023-10-16T15:00:50Z',
                failures: 0,
                ok: 22,
                skipped: 7
              },
              lastTransitionTime: '2023-10-16T15:00:50Z',
              message: 'Awaiting next reconciliation',
              reason: 'Successful',
              status: 'True',
              type: 'Running'
            }
          ],
          version: {
            reconciled: '8.4.0-pre.mar11'
          }
        },
        config: {},
        configs: {}
      }
    ]
  },
  '/uiresources': {
    username: 'adminuser',
    userDisplayName: 'Test Admin',
    routes: {
      profile: 'https://home.my-domain/myaccount',
      navigator: 'https://mockedworkspace.home.my-domain',
      admin: 'https://admin.my-domain',
      logout: 'https://home.my-domain/logout',
      logoutInactivity: 'https://home.my-domain/logout/inactivity',
      whatsNew: 'https://www.ibm.com',
      gettingStarted: 'https://www.ibm.com',
      documentation: 'https://www.ibm.com',
      requestEnhancement: 'https://www.ibm.com',
      support: 'https://www.ibm.com',
      about: 'https://home.my-domain/about',
      workspaceId: 'mockedworkspace',
      domain: 'my-domain'
    },
    applications: [
      {
        id: 'eam',
        name: 'Manage',
        href: 'https://myeam.mydomain.com',
        isExternal: true
      },
      {
        id: 'mroio',
        name: 'MRO Inventory Optimization',
        href: 'https://mymroio.mydomain.com',
        isExternal: true
      },
      {
        id: 'apm',
        name: 'APM for E&U',
        href: 'https://apm4eu.mydomain.com',
        isExternal: true
      }
    ],
    workspaces: [
      {
        id: 'mockedworkspace',
        name: 'Mocked Workspace',
        href: 'https://mockedworkspace.home.my-domain',
        isCurrent: true,
        applications: [
          {
            id: 'manage',
            name: 'Manage',
            href: 'https://mockedworkspace.manage.mydomain.com/',
            isExternal: false,
            isCurrent: false
          },
          {
            id: 'Health',
            name: 'Health',
            href: 'https://mockedworkspace.health.mydomain.com/',
            isExternal: false,
            isCurrent: false
          },
          {
            id: 'eam',
            name: 'Manage',
            href: 'https://myeam.mydomain.com',
            isExternal: true
          }
        ]
      }
    ],
    i18n: {
      help: 'Help',
      profileTitle: 'Profile',
      profileManageButton: 'Manage profile',
      profileLogoutButton: 'Log out',
      logout: 'Logout',
      userIcon: 'User',
      administrationIcon: 'Administration',
      settingsIcon: 'Settings',
      profileLogoutModalHeading: 'Do you wish to log out?',
      profileLogoutModalSecondaryButton: 'Cancel',
      profileLogoutModalPrimaryButton: 'Log out',
      profileLogoutModalBody:
        'You are logged in to {solutionName} as {userName}.  Logging out also logs you out of each application that is open in the same browser.  To ensure a secure log out, close all open browser windows.',
      switcherWorkspace: 'Workspace',
      switcherWorkspaces: 'Workspaces',
      switcherWorkspaceAdmin: 'Workspace administration',
      switcherBackToAppSwitcher: 'Back to applications',
      switcherSelectWorkspace: 'Select a workspace',
      switcherAvailableWorkspaces: 'Available workspaces',
      switcherSuiteAdmin: 'Suite administration',
      switcherGlobal: 'Global / other',
      switcherMyApplications: 'My applications',
      switcherNavigatorLink: 'All applications',
      switcherLearnMoreLink: 'Learn more',
      switcherRequestAccess: 'Contact your administrator to request application access',
      whatsNew: "What's new",
      documentation: 'Documentation',
      requestEnhancement: 'Request enhancement',
      about: 'About',
      support: 'Support',
      gettingStarted: 'Getting started',
      surveyTitle: 'Enjoying {solutionName}?',
      surveyText: 'Click here to help us improve the product',
      surveyPrivacyPolicy: 'IBM Privacy Policy',
      sessionTimeoutModalHeading: 'Session Timeout',
      sessionTimeoutModalBody: 'You will be logged out due to inactivity in {countdown} seconds.',
      sessionTimeoutModalLogoutButton: 'Log out',
      sessionTimeoutModalStayLoggedInButton: 'Stay logged in'
    },
    surveyData: {
      surveyLink: 'https://www.ibm.com',
      privacyLink: 'http://www.ibm.com/en/privacy'
    },
    idleTimeoutData: {
      timeout: 0,
      countdown: 180,
      cookieName: '_user_inactivity_timeout'
    },
    customization: {
      metadata: {
        // Uncomment the props below to test custom metadata in storybook
        // enableAnonymousAccess: true,
        // companyName: 'ACME',
        // productName: 'My product'
      },
      images: {
        headerLogo:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABWUlEQVR4AZ2UTShEURTH75vIghALUjRSIwuRUkqJjY1SLKyVjY1Y2oiVlYWEtYWNDbLH1sZHSdn5TJTxUTaK7vxO79a87tyZe5tTv8675533f+fec95TKtC01qNQ78ursB6qxfVBBrJwBe8wA/tRFH35BFMJsXncLvTCm4RgDS7hArF7FWqILcOKFUvDKQzDsaxDxQZh2yF2DR2J9UGo4BG0JtZtcAfTVt4qDPj05Aw15/OUiG3CHrEdK/cMvIJ2l5dw3YiNO3I/VDwB3gobjFgaJ4Ij1ksmoI5LmcFbn6BUKJ3sx2/AlmM8PlU8jzKXcz5BqaDFNOG52GgQP9d5O4FFM06Zggqp6IUbcj7NDqEq3Cw8wC+8wjd0GrLk/Kj4Q7iBx4hAj9nSGExBDUhSJVTDoaPjJbe8AP9WrF2VadKURkgh0oVvgiEVz2J5htCkOew/WA/5RZWyHJiL382Pqa58AAAAAElFTkSuQmCC'
      },
      css: {
        customStyle: '/custom-css.css'
      },
      js: {},
      files: {}
    },
    walkme: 'disabled'
  },

  '/config/eam': {
    url: 'https://myeam.mydomain.com',
    creationTimestamp: '2020-07-24T06:22:39-04:00'
  },
  '/applications': [
    {
      id: 'iot',
      category: 'tool',
      deployed: true,
      deployedVersion: '8.0.0',
      deployedSpec: {test: {foo: 'bar'}},
      components: [
        {
          name: 'devops',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'mbgx',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'datapower',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'logmet',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'orgmgmt',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'auth',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'provision',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'registry',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'mfgx',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'model',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'state',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'actions',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'dm',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'guardian',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        },
        {
          name: 'webui',
          version: '8.0.0',
          state: 'DEPLOYED',
          timestamp: '2020-07-24T06:24:46-04:00'
        }
      ],
      entitlement: 'LIMITED',
      supportedReleases: [
        {
          config: [
            {id: 'mongo', required: true, scope: 'SYSTEM'},
            {id: 'kafka', required: true, scope: 'SYSTEM'},
            {id: 'jdbc', required: true, scope: 'SYSTEM'},
            {id: 'pagerduty', required: false, scope: 'SYSTEM'},
            {id: 'slack', required: false, scope: 'SYSTEM'}
          ],
          integratesWith: [{appId: 'monitor', required: false, supportedReleases: ['8.0', '8.1']}],
          versions: ['8.0.0', '8.0.1-pre.fvt', '8.0.1'],
          release: '8.0'
        },
        {
          config: [
            {id: 'mongo', required: true, scope: 'system'},
            {id: 'kafka', required: true, scope: 'system'},
            {id: 'jdbc', required: true, scope: 'system'},
            {id: 'pagerduty', required: false, scope: 'system'},
            {id: 'slack', required: false, scope: 'system'}
          ],
          integratesWith: [{appId: 'monitor', required: false, supportedReleases: ['8.0', '8.1']}],
          versions: ['8.1.0-pre.dev81', '8.1.0'],
          release: '8.1'
        }
      ]
    },
    {
      id: 'monitor',
      category: 'application',
      deployed: false,
      deployedVersion: null,
      deployedSpec: null,
      components: [],
      entitlement: 'LIMITED',
      supportedReleases: [
        {
          config: [
            {id: 'jdbc', required: true, scope: 'system'},
            {id: 'slack', required: false, scope: 'system'}
          ],
          integratesWith: [{appId: 'iot', required: true, supportedReleases: ['8.0', '8.1']}],
          versions: ['8.0.0-pre.fvt', '8.0.0'],
          release: '8.0'
        },
        {
          config: [
            {id: 'jdbc', required: true, scope: 'SYSTEM'},
            {id: 'slack', required: false, scope: 'SYSTEM'}
          ],
          integratesWith: [{appId: 'iot', required: true, supportedReleases: ['8.0', '8.1']}],
          versions: ['8.1.0-pre.dev81', '8.1.0'],
          release: '8.1'
        }
      ]
    },
    {
      id: 'health',
      category: 'application',
      deployed: false,
      deployedVersion: null,
      deployedSpec: null,
      components: [],
      entitlement: 'BASE',
      supportedReleases: [
        {
          config: [
            {id: 'jdbc', required: true, scope: 'workspace'},
            {id: 'slack', required: false, scope: 'system'}
          ],
          integratesWith: [
            {
              appId: 'monitor',
              required: false,
              supportedReleases: ['8.0', '8.1']
            },
            {appId: 'predict', required: false, supportedReleases: ['8.0', '8.1']}
          ],
          versions: ['8.0.0-pre.stable', '8.0.0-pre.dev', '8.0.0-pre.fvt', '8.0.0'],
          release: '8.0'
        }
      ]
    },
    {
      id: 'predict',
      category: 'application',
      deployed: false,
      deployedVersion: null,
      deployedSpec: null,
      components: [],
      entitlement: 'PREMIUM',
      supportedReleases: [
        {
          config: [
            {id: 'jdbc', required: true, scope: 'workspace'},
            {id: 'slack', required: false, scope: 'system'}
          ],
          integratesWith: [
            {appId: 'health', required: true, supportedReleases: ['8.0']},
            {appId: 'monitor', required: true, supportedReleases: ['8.0', '8.1']}
          ],
          versions: ['8.0.0-pre.stable', '8.0.0-pre.fvt', '8.0.0'],
          release: '8.0'
        }
      ]
    }
  ]
};

module.exports = function (app) {
  Object.keys(fixture).forEach(k => {
    const resp = (req, res) => {
      res.set('x-masapi', `emulated: ${k}`);
      res.json(fixture[k]);
    };
    app.use(`/masapi${k}`, resp);
    app.use(`/undefined/internal${k}`, resp);
  });

  app.use('/refreshtoken', (req, res) => {
    res.set('x-masapi', `emulated: /refreshtoken`);
    res.json({});
  });

  app.use('/custom-css.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.send(`
.bx--header__name {
  color: red!important;
}
    `);
  });

  // app.use('/masapi/uiresources', function (req, res) {
  //   // emulate the cache / no-cache scenario
  //   if (req.query && req.query.cache === 'true') {
  //     res.set('x-masapi', 'emulated');
  //     res.set('x-masapi-cached', 'true');
  //     res.json(uiResourcesMasthead);
  //   } else {
  //     setTimeout(() => {
  //       res.set('x-masapi', 'emulated');
  //       res.json(uiResourcesMastheadNoCache);
  //     }, 1000);
  //   }
  // });
};
