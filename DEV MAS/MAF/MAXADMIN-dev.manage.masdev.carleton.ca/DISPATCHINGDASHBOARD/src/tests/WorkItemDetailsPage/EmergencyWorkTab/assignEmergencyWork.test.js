import { log } from '@maximo/maximo-js-api';
import assignEmergencyWork from '../../../WorkItemDetailsPage/EmergencyWorkTab/assignEmergencyWork';

let app;
let invokeActionSpy;
let getSelectedItemsSpy;
let logSpy;
let resourceItem;
let emergencyWorkItem;

const TAG = 'assignEmergencyWork';

jest.mock('@maximo/maximo-js-api', () => ({
  log: {
    e: jest.fn(),
  },
}));

describe('assignEmergencyWork', () => {
  beforeEach(() => {
    logSpy = jest.spyOn(log, 'e');
    invokeActionSpy = jest.fn();
    getSelectedItemsSpy = jest.fn();

    app = {
      toast: jest.fn(),

      getLocalizedLabel: jest.fn((labelCode, labelText) => labelText),

      findDatasource: () => ({
        invokeAction: invokeActionSpy,
        item: { id: 123 },
        getSelectedItems: getSelectedItemsSpy,
        state: { loading: false },
      }),
    };

    emergencyWorkItem = {
      assignmentid: 2114,
      wonum: 'EMW01',
    };

    getSelectedItemsSpy = jest.fn(() => [emergencyWorkItem]);

    resourceItem = {
      laborcode: 'SAM',
      starttimedate: '2023-12-13T09:00:00-05:00',
      endtimedate: '2023-12-13T11:00:00-05:00',
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    app = null;
    resourceItem = null;
  });

  it('shows failure toast and log error without calling backend when resource laborcode is missing', () => {
    resourceItem = null;
    assignEmergencyWork(app, resourceItem);

    expect(app.toast).toHaveBeenCalledTimes(1);
    expect(app.toast).toHaveBeenCalledWith(
      'Failed to assign emergency work',
      'error'
    );

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(TAG, 'resource laborcode missing');

    expect(invokeActionSpy).not.toHaveBeenCalled();
  });

  it('shows failure toast and log error without calling backend when emergency work assignmentid is missing', () => {
    getSelectedItemsSpy = jest.fn(() => []);
    assignEmergencyWork(app, resourceItem);

    expect(app.toast).toHaveBeenCalledTimes(1);
    expect(app.toast).toHaveBeenCalledWith(
      'Failed to assign emergency work',
      'error'
    );

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      TAG,
      'emergency work assignmentid missing'
    );

    expect(invokeActionSpy).not.toHaveBeenCalled();
  });

  it('shows success toast when assingment is successful', async () => {
    invokeActionSpy = jest.fn(() => Promise.resolve({}));

    await assignEmergencyWork(app, resourceItem);

    expect(invokeActionSpy).toHaveBeenCalledTimes(1);
    expect(invokeActionSpy).toHaveBeenCalledWith('assignLabor', {
      parameters: {
        assignmentid: 2114,
        laborCode: 'SAM',
        startTime: '2023-12-13T09:00:00-05:00',
        endTime: '2023-12-13T11:00:00-05:00',
      },
      record: { id: 123 },
    });
    expect(app.toast).toHaveBeenCalledTimes(1);
    expect(app.toast).toHaveBeenCalledWith(
      'Emergency work record EMW01 was assigned.',
      'success'
    );

    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  it('shows failure toast and log error when assignment fails', async () => {
    invokeActionSpy = jest.fn(() =>
      Promise.resolve({ error: 'mock assignment failure' })
    );

    await assignEmergencyWork(app, resourceItem);

    expect(invokeActionSpy).toHaveBeenCalledTimes(1);
    expect(invokeActionSpy).toHaveBeenCalledWith('assignLabor', {
      parameters: {
        assignmentid: 2114,
        laborCode: 'SAM',
        startTime: '2023-12-13T09:00:00-05:00',
        endTime: '2023-12-13T11:00:00-05:00',
      },
      record: { id: 123 },
    });
    expect(app.toast).toHaveBeenCalledTimes(1);
    expect(app.toast).toHaveBeenCalledWith(
      'Failed to assign emergency work',
      'error'
    );

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(TAG, 'Failed to assign emergency work');
  });
});
