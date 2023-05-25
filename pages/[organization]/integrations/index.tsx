import DiscordIcon from 'components/icon/discord';
import SlackIcon from 'components/icon/slack';
import TeamsIcon from 'components/icon/teams';
import WebhookIcon from 'components/icon/webhook';
import {
  IntegrationNameDiscord,
  IntegrationNameSlack,
  IntegrationNameTeams,
  IntegrationNameWebhook,
} from 'constants/default';
import { useAtom } from 'jotai';
import DashboardLayout from 'layout/dashboard-layout';
import { AppName } from 'lib/global';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import { globalAtom } from 'store/global';
import { LocalIcon } from 'types/main';

interface Integration {
  name: string;
  icon: LocalIcon;
}

const integrations: Integration[] = [
  {
    name: IntegrationNameSlack,
    icon: SlackIcon,
  },
  {
    name: IntegrationNameTeams,
    icon: TeamsIcon,
  },
  {
    name: IntegrationNameDiscord,
    icon: DiscordIcon,
  },
  {
    name: IntegrationNameWebhook,
    icon: WebhookIcon,
  },
];

const Integrations: NextPageWithLayout = () => {
  const [global] = useAtom(globalAtom);

  const handleIntegrationClick = (item: Integration) => {
    if (item.name === IntegrationNameSlack) {
      const returnURL = `${window.location.origin}/api/integration/slack/${global.currentUser!.Organization.Slug}`;
      const url = 'https://slack.com/oauth/v2/authorize';
      window.location.replace(
        `${url}?scope=chat:write,incoming-webhook&redirect_uri=${returnURL}&client_id=${process.env.GITHUB_SECRET!}`
      );
    }
  };

  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="border-b px-1 pb-6 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of integrations that you can configure for getting notifications
        </p>
      </div>
      <div className="mt-6 grid-cols-2 gap-x-5 gap-y-5 xl:grid">
        {integrations.map((integration) => (
          <article
            key={integration.name}
            className="mb-5 rounded bg-white p-4 ring ring-slate-100 sm:p-6 lg:p-8 xl:mb-0"
          >
            <div className="flex h-full items-center space-x-5">
              <integration.icon className="h-12 w-12 rounded border border-slate-200" />
              <div className="flex grow items-center space-x-2">
                <div className="grow">
                  <b className="text-neutral-800">{integration.name}</b>
                  <p className="text-sm text-gray-700">
                    Post new {AppName!} incidents to {integration.name}
                  </p>
                </div>
                <button
                  onClick={() => handleIntegrationClick(integration)}
                  className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

Integrations.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Integrations;
