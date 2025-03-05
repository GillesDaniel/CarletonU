import { log } from '@maximo/maximo-js-api';
import invokeUnassignWorkRecord from '../../../WorkItemDetailsPage/EmergencyWorkTab/invokeUnassignWorkRecord';

let app;
let invokeActionSpy;
let logSpy;

const TAG = 'unassignWorkRecord';

jest.mock('@maximo/maximo-js-api', () => ({
  log: {
    e: jest.fn(),
  },
}));

describe('invokeUnassignWorkRecord', () => {
  beforeEach(() => {
    logSpy = jest.spyOn(log, 'e');
    invokeActionSpy = jest.fn();

    app = {
      toast: jest.fn(),
      getLocalizedLabel: jest.fn((id, message) => message),
      findDatasource: () => ({
        invokeAction: invokeActionSpy,
        item: { id: 123 },
      }),
    };
  });

  afterEach(() => {
    app = null;
    jest.restoreAllMocks();
  });

  it('open error toast notification if assignmentid is missing', () => {
    invokeUnassignWorkRecord(app, { laborcode: '003' });

    expect(app.toast).toHaveBeenCalledTimes(1);
    expect(app.toast).toHaveBeenCalledWith(
      'Failed to unassign work record',
      'error'
    );
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      TAG,
      'work record assignmentid is missing'
    );
    expect(invokeActionSpy).not.toHaveBeenCalled();
  });

  it('open success toast if work record is unassigned', async () => {
    invokeActionSpy = jest.fn(() => Promise.resolve({}));

    await invokeUnassignWorkRecord(app, {
      assignmentid: 1111,
      wonum: 'TEST',
    });

    expect(invokeActionSpy).toHaveBeenCalledTimes(1);
    expect(invokeActionSpy).toHaveBeenCalledWith('unassignLabor', {
      parameters: { assignmentid: 1111 },
      record: { id: 123 },
    });
    expect(app.toast).toHaveBeenCalledTimes(1);
    expect(app.toast).toHaveBeenCalledWith(
      'Emergency work record TEST was unassigned.',
      'success'
    );

    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  it('open error toast if cannot unassign work record', async () => {
    invokeActionSpy = jest.fn(() =>
      Promise.resolve({ error: 'failed to unassign' })
    );

    await invokeUnassignWorkRecord(app, {
      assignmentid: 1111,
      wonum: 'TEST',
    });

    expect(invokeActionSpy).toHaveBeenCalledTimes(1);
    expect(invokeActionSpy).toHaveBeenCalledWith('unassignLabor', {
      parameters: { assignmentid: 1111 },
      record: { id: 123 },
    });
    expect(app.toast).toHaveBeenCalledTimes(1);
    expect(app.toast).toHaveBeenCalledWith(
      'Failed to unassign work record',
      'error'
    );

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(TAG, 'Failed to unassign work record');
  });
});
