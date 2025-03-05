import EmergencyDataUtils from '../../../WorkItemDetailsPage/EmergencyWorkTab/EmergencyDataUtils';

let app;
let invokeActionSpy;

describe('runOptimizationForEmergency', () => {
  beforeEach(() => {
    invokeActionSpy = jest.fn();

    app = {
      findDatasource: () => ({
        invokeAction: invokeActionSpy,
        items: { id: 123 },
      }),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    app = null;
  });

  it('runOptimizationForEmergency invokes optimizer', () => {
    EmergencyDataUtils.runOptimizationForEmergency(app);
    expect(invokeActionSpy).toHaveBeenCalled();
  });

  it('replaces displayname with laborcode if displayname is not available', () => {
    expect(
      EmergencyDataUtils.getAllItemsForRecommendedResources(
        ['123'],
        [{ laborcode: '123' }]
      )
    ).toEqual([
      {
        assignmentid: undefined,
        assignments: [],
        craft: undefined,
        displayname: '123',
        drivetimesec: undefined,
        endtimedate: undefined,
        formatteddrivetime: undefined,
        formattedtime: undefined,
        href: undefined,
        laborcode: '123',
        skdodmerunid: undefined,
        skilllevel: undefined,
        starttimedate: undefined,
        toprecommendation: undefined,
      },
    ]);
  });

  describe('priority tag generation', () => {
    it('generate correct wopriority tag', () => {
      const mockGetLocalizedLabel = jest.fn();
      app = {
        getLocalizedLabel: mockGetLocalizedLabel,
      };

      let tag;

      const recommendation1 = { wopriority: '7' };

      tag = EmergencyDataUtils.computePriorityTag(app, recommendation1);
      expect(JSON.stringify(tag[0])).toContain('gray');

      const recommendation2 = { wopriority: '1' };
      tag = EmergencyDataUtils.computePriorityTag(app, recommendation2);
      expect(JSON.stringify(tag[0])).toContain('red');

      tag = EmergencyDataUtils.computePriorityTag(app, [{}]);
      expect(tag).toBeNull();
    });
  });
});
