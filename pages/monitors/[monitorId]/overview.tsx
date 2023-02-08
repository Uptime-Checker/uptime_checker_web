import LineChart from 'components/dashboard/chart/line-chart';
import { ChartData, ChartLine, ChartPoint } from 'components/dashboard/chartv2/utils';
import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../_app';

const chartData = [
  {
    year: 1951,
    'Population growth rate': 1.74,
  },
  {
    year: 1952,
    'Population growth rate': 1.93,
  },
  {
    year: 1953,
    'Population growth rate': 1.9,
  },
  {
    year: 1954,
    'Population growth rate': 1.98,
  },
  {
    year: 1955,
    'Population growth rate': 2,
  },
  {
    year: 1956,
    'Population growth rate': 1.74,
  },
  {
    year: 1957,
    'Population growth rate': 1.84,
  },
  {
    year: 1958,
    'Population growth rate': 1.56,
  },
  {
    year: 1959,
    'Population growth rate': 1.48,
  },
  {
    year: 1960,
    'Population growth rate': 1.32,
  },
];

const dataFormatter = (number: number) => `${Intl.NumberFormat('us').format(number).toString()}%`;

const Overview: NextPageWithLayout = () => {
  const getChartData = () => {
    let points = chartData.map((el) => {
      let point: ChartPoint = {
        spatialValue: el['Population growth rate'],
        temporalValue: el.year,
      };
      return point;
    });

    let line: ChartLine = {
      key: 'Denmark',
      color: '#3B82F6',
      points: points,
    };

    let data: ChartData = {
      spatialKey: 'Population growth rate',
      temporalKey: 'Year',
      lines: [line],
    };

    return data;
  };

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
        <LineChart
          data={chartData}
          showAnimation={false}
          dataKey="year"
          autoMinValue={true}
          categories={['Population growth rate']}
          colors={['blue']}
          valueFormatter={dataFormatter}
          className="mt-5 h-80"
          maxValue={2.2}
        ></LineChart>
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
