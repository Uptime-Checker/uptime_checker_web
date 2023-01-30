import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../_app';
import { Axis, Grid, LineSeries, XYChart } from '@visx/xychart';

const data1 = [
  { x: '2020-01-01', y: 50 },
  { x: '2020-01-02', y: 10 },
  { x: '2020-01-03', y: 20 },
];

const data2 = [
  { x: '2020-01-01', y: 30 },
  { x: '2020-01-02', y: 40 },
  { x: '2020-01-03', y: 80 },
];

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

const Overview: NextPageWithLayout = () => {
  return (
    <div className="mt-5">
      <section className="flex flex-col items-baseline justify-between lg:flex-row">
        <h2 className="mb-2 lg:mb-0 lg:pr-4">Response times across regions in the last day</h2>
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
      <section>
        <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
          <Axis orientation="bottom" />
          <Grid columns={false} numTicks={4} />
          <LineSeries dataKey="Line 1" data={data1} {...accessors} />
          <LineSeries dataKey="Line 2" data={data2} {...accessors} />
        </XYChart>
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
