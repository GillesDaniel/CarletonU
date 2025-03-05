import { Application, Page } from '@maximo/maximo-js-api';
import WorkItemMapPageController from '../WorkItemMapPageController';

describe('WorkItemDetailsPageController', () => {
  describe('onBreadcrumbItemClick', () => {
    it('redirects to dispatch page', () => {
      const app = new Application();
      const page = new Page({
        name: 'workItemMap',
      });
      const controller = new WorkItemMapPageController();

      controller.pageInitialized(page, app);

      const setCurrentPageSpy = jest.spyOn(app, 'setCurrentPage');
      controller.onBreadcrumbItemClick({
        label: 'Dispatching Dashboard',
        value: 'dispatching',
      });

      expect(setCurrentPageSpy).toHaveBeenCalledWith({
        name: 'dispatch',
      });
    });

    it('redirects to workItemDetails page', () => {
      const app = new Application();
      const page = new Page({
        name: 'workItemMap',
      });
      const controller = new WorkItemMapPageController();

      controller.pageInitialized(page, app);

      const setCurrentPageSpy = jest.spyOn(app, 'setCurrentPage');
      controller.onBreadcrumbItemClick({
        label: 'Birm-Maint',
        value: 'details',
      });

      expect(setCurrentPageSpy).toHaveBeenCalledWith({
        name: 'workItemDetails',
      });
    });
  });
});
