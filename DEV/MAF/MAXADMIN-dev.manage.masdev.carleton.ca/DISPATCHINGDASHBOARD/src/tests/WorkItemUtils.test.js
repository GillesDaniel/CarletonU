import {
  JSONDataAdapter,
  Application,
  Datasource,
  Page,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import WorkItemUtils from '../WorkItemUtils';
import sampleProjectItem from '../model/sampleProjectItem';

function newDatasource(
  data = sampleProjectItem,
  items = 'member',
  idAttribute = 'id',
  name = 'skdactivityunscheduledDS'
) {
  const da = new JSONDataAdapter({
    src: data,
    items,
  });
  const ds = new Datasource(da, {
    idAttribute,
    name,
  });
  return ds;
}

describe('WorkItemUtils', () => {
  let ds;
  let app;
  let page;

  beforeEach(() => {
    ds = newDatasource(sampleProjectItem, 'member', 'id', 'skdprojectsDS');
    app = new Application();
    page = new Page({ name: 'workItemDetails' });
    app.registerPage(page);
    page.registerDatasource(ds);
  });

  it('runOptimizeForEmergency', async () => {
    const invokeAction = sinon.stub(ds, 'invokeAction').returns({});
    await app.initialize();
    WorkItemUtils.runOptimizationForEmergency(app, page);
    expect(invokeAction.called).toBe(true);
  });

  it('format timestamp as hours:minutes am/pm', () => {
    const timestampNoLeadingZero = '2023-12-13T11:19:00';
    const timestampWithTimezone = '2023-12-13T08:19:00-05:00';
    const timestampPm = '2023-12-13T15:19:00';

    expect(WorkItemUtils.formatTime(timestampNoLeadingZero)).toEqual(
      '11:19 AM'
    );
    expect(WorkItemUtils.formatTime(timestampWithTimezone)).toEqual('8:19 AM');
    expect(WorkItemUtils.formatTime(timestampPm)).toEqual('3:19 PM');
  });

  it('format duration as hours:minutes', () => {
    const durationSingleDigit = 2;
    const durationDecimal = 2.5;
    const durationDoubleDigit = 10;

    expect(
      WorkItemUtils.formatHoursToHoursMinutes(durationSingleDigit)
    ).toEqual('2:00');
    expect(WorkItemUtils.formatHoursToHoursMinutes(durationDecimal)).toEqual(
      '2:30'
    );
    expect(
      WorkItemUtils.formatHoursToHoursMinutes(durationDoubleDigit)
    ).toEqual('10:00');
  });

  it('format datetime', () => {
    const timestampWithTimezone = '2023-12-13T08:19:00-05:00';
    expect(
      WorkItemUtils.formatDateTime(timestampWithTimezone, 'Europe/Dublin')
    ).toEqual('12/13/2023 1:19 PM');
  });
});
