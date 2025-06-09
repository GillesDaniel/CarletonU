import resourcePanel from '../../../WorkItemDetailsPage/EmergencyWorkTab/resourcePanel';

let app;
let getSelectedItemsSpy;
const selectedEmergencyWorkItem = {
  wogroup: 'EMWO1',
  taskid: '1',
};

describe('resourcePanel', () => {
  beforeEach(() => {
    app = {
      findDatasource: () => ({
        getSelectedItems: getSelectedItemsSpy,
      }),
      getLocalizedMessage: (appName, labelCode, labelText) => labelText,
    };
  });

  it('generate selected unassigned emergency work item title according to wogroup', () => {
    getSelectedItemsSpy = jest.fn(() => [selectedEmergencyWorkItem]);
    const generatedWorkItemTitle =
      resourcePanel.generateSelectedUnassignedEmergencyWorkItemTitle(app);
    expect(generatedWorkItemTitle).toBe('EMWO1 (1)');
  });

  it('generate empty string as title if there is no selected unassigned emergency work item', () => {
    getSelectedItemsSpy = jest.fn(() => []);
    const generatedWorkItemTitle =
      resourcePanel.generateSelectedUnassignedEmergencyWorkItemTitle(app);
    expect(generatedWorkItemTitle).toBe('');
  });

  it('returns default header', () => {
    const defaultLabel =
      resourcePanel.defaultHeaderMessageForResourcePanel(app);
    expect(defaultLabel).toBe('Resources');
  });

  it('returns default header when there are no unassigned emergency work item', () => {
    const label = resourcePanel.generateResourcePanelHeader(app);
    expect(label).toBe('Resources');
  });

  it('returns header mentioning selected work item', () => {
    getSelectedItemsSpy = jest.fn(() => [selectedEmergencyWorkItem]);
    const label = resourcePanel.generateResourcePanelHeader(app);
    expect(label).toBe('Resources for EMWO1 (1)');
  });
});
