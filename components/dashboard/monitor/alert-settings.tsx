import { AtSymbolIcon, TrashIcon } from '@heroicons/react/24/outline';
import SwitchControl from 'components/switch';

type Props = {
  text: String;
};

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Oct 4, 2022,  03:34:31 AM',
    email: 'Oct 4, 2025,  03:34:31 AM',
    role: '2 hours, 38 Minutes',
  },
  {
    name: 'Slack',
    title: 'Oct 4, 2022,  03:34:31 AM',
    email: 'Oct 4, 2028,  03:34:31 AM',
    role: '2 hours, 38 Minutes',
  },
  {
    name: 'Webhook',
    title: 'Oct 4, 2022,  03:34:31 AM',
    email: 'Oct 4, 2029,  03:34:31 AM',
    role: '2 hours, 38 Minutes',
  },
  // More people...
];

const AlertSettingsComponent = ({ text }: Props) => {
  return (
    <>
      <div className="px-1 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Alert Settings</h1>
        <p className="mt-2 text-sm text-gray-700">{text}</p>
      </div>
      <div className="my-10">
        <section className="mx-0 px-1 text-sm text-gray-700 sm:mx-4">
          <div className="mb-5 border-b pb-5 lg:flex">
            <section className="mr-32 font-semibold lg:font-normal">Escalation</section>
            <section className="mt-5 w-full lg:mt-0">
              <label className="flex text-sm text-gray-700">
                <span>Send an alert notification</span>
                <span className="block sm:hidden">, When a Monitor</span>
              </label>
              <fieldset className="mt-3 lg:mt-6">
                <legend className="sr-only">Notification method</legend>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="checkFail"
                      name="notification-method"
                      type="radio"
                      defaultChecked
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="checkFail" className="ml-1 block text-sm text-gray-700 sm:ml-3">
                      <div className="flex items-center space-x-2">
                        <span className="hidden sm:block">When a Monitor</span>
                        <span>has failed</span>
                        <select
                          id="location"
                          name="location"
                          className="w-[52px] rounded-md border-0 bg-gray-100 py-0.5 pl-3 pr-0 text-sm text-gray-900 focus:ring-0"
                          defaultValue="2"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                        <span>time(s)</span>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="checkTime"
                      name="notification-method"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="checkTime" className="ml-1 block text-sm text-gray-700 sm:ml-3">
                      <div className="flex items-center space-x-2">
                        <span className="hidden sm:block">When a Monitor</span>
                        <span>is failing for more than</span>
                        <select
                          id="location"
                          name="location"
                          className="w-[60px] rounded-md border-0 bg-gray-100 py-0.5 pl-3 pr-0 text-sm text-gray-900 focus:ring-0"
                          defaultValue="10"
                        >
                          <option>5</option>
                          <option>10</option>
                          <option>30</option>
                        </select>
                        <span>minutes</span>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="regionFail"
                      name="notification-method"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="regionFail" className="ml-1 block text-sm text-gray-700 sm:ml-3">
                      <div className="flex items-center space-x-2">
                        <span className="hidden sm:block">When a Monitor</span>
                        <span>has failed in</span>
                        <select
                          id="location"
                          name="location"
                          className="w-[52px] rounded-md border-0 bg-gray-100 py-0.5 pl-3 pr-0 text-sm text-gray-900 focus:ring-0"
                          defaultValue="3"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                        <span>region(s)</span>
                      </div>
                    </label>
                  </div>
                </div>
              </fieldset>
            </section>
          </div>
          <div className="items-center lg:flex">
            <section className="mr-32 font-semibold lg:font-normal">Reminders</section>
            <section className="mt-5 w-full lg:mt-0">
              <label className="text-sm text-gray-700">
                <div className="items-center xl:flex xl:space-x-2">
                  <div className="flex items-center space-x-2">
                    <span>Send out a maximum of</span>
                    <select
                      id="location"
                      name="location"
                      className="w-[88px] rounded-md border-0 bg-gray-100 py-0.5 pl-3 pr-0 text-sm text-gray-900 focus:ring-0"
                      defaultValue="5"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>inifnite</option>
                    </select>
                    <span>reminders,</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>with a</span>
                    <select
                      id="location"
                      name="location"
                      className="w-[60px] rounded-md border-0 bg-gray-100 py-0.5 pl-3 pr-0 text-sm text-gray-900 focus:ring-0"
                      defaultValue="10"
                    >
                      <option>5</option>
                      <option>10</option>
                      <option>15</option>
                    </select>
                    <span>minutes interval</span>
                  </div>
                </div>
              </label>
            </section>
          </div>
        </section>
        <section></section>
      </div>
      <div className="my-10">
        <h2 className="text-xl font-semibold text-gray-900">Alert Channels</h2>
        <p className="mt-2 text-sm text-gray-700">
          These are your global alert channels for the checks in your account. Any check failure and recovery will be
          sent to these channels.
        </p>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-sm font-semibold text-gray-900">
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left sm:pl-6">
                      Detail
                    </th>
                    <th scope="col" className="hidden py-3.5 px-3 text-center sm:table-cell">
                      Channel
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-center">
                      Subscribed
                    </th>
                    <th scope="col" className="relative hidden py-3.5 pl-3 pr-4 md:table-cell">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm text-gray-500 sm:pl-6">
                        <div className="flex items-center gap-2">
                          <AtSymbolIcon className="h-4 w-4" />
                          <span>Email to</span>
                          <span className="text-black">mr.k779@gmail.com</span>
                        </div>
                        <dl className="font-normal sm:hidden">
                          <dt className="sr-only">Title</dt>
                          <dd className="mt-1 truncate text-gray-700">{person.name}</dd>
                        </dl>
                      </td>
                      <td className="hidden whitespace-nowrap py-4 px-3 text-center text-sm text-gray-500 sm:table-cell">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-center text-sm text-gray-500">
                        <SwitchControl />
                      </td>
                      <td className="p3-4 font-mediumsm:pr-6 relative hidden whitespace-nowrap pl-3 pr-4 text-right text-sm md:table-cell">
                        <button className="px-3 py-3 text-red-500 hover:text-red-900">
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertSettingsComponent;
