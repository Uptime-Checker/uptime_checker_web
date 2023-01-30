import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../_app';

const Overview: NextPageWithLayout = () => {
  return (
    <div className="mt-5">
      <section className="flex flex-col items-end justify-between md:flex-row">
        <h2 className="mb-2 pr-2 md:mb-0">Response times across regions in the last day</h2>
        <div
          className="flex items-baseline rounded bg-neutral-100 p-[2px]"
          data-target="endpoints--response-times-tabs.tabs"
        >
          <div
            className="cursor-pointer rounded bg-white px-4 py-1 text-neutral-800 shadow"
            data-action="click->endpoints--response-times-tabs#changeTab"
            data-preference="day"
            data-url="/team/44631/monitors/751810/response-chart?days=1"
          >
            Day
          </div>
          <div
            className="cursor-pointer rounded px-4 py-1"
            data-action="click->endpoints--response-times-tabs#changeTab"
            data-preference="week"
            data-url="/team/44631/monitors/751810/response-chart?days=7"
          >
            Week
          </div>
          <div
            className="cursor-pointer rounded px-4 py-1"
            data-action="click->endpoints--response-times-tabs#changeTab"
            data-preference="month"
            data-url="/team/44631/monitors/751810/response-chart?days=30"
          >
            Month
          </div>
        </div>
      </section>
    </div>
  );
};

Overview.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <MonitorDetailLayout>{page}</MonitorDetailLayout>
    </DashboardLayout>
  );
};

export default Overview;
