import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/solid';
import { Block, Card, ColGrid, Color, Flex, Icon, Metric, Text } from '@tremor/react';
import DashboardLayout from 'layout/dashboard-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const categories: {
  title: string;
  metric: string;
  icon: any;
  color: Color;
}[] = [
  {
    title: 'Passing',
    metric: '5',
    icon: ShieldCheckIcon,
    color: 'teal',
  },
  {
    title: 'Failing',
    metric: '2',
    icon: ShieldExclamationIcon,
    color: 'red',
  },
  {
    title: 'Incidents (Last 7 Days)',
    metric: '456',
    icon: ShieldExclamationIcon,
    color: 'amber',
  },
];

const Monitors: NextPageWithLayout = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <ColGrid numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
        {categories.map((item) => (
          <button>
            <Card key={item.title} decoration="" decorationColor={item.color} shadow={true}>
              <Flex justifyContent="justify-start" spaceX="space-x-4">
                <Icon icon={item.icon} variant="light" size="xl" color={item.color} />
                <Block truncate={true}>
                  <Text>{item.title}</Text>
                  <Metric truncate={true}>{item.metric}</Metric>
                </Block>
              </Flex>
            </Card>
          </button>
        ))}
      </ColGrid>
    </div>
  );
};

Monitors.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Monitors;
