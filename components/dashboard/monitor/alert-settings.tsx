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
    name: 'Lindsay Walton',
    title: 'Oct 4, 2022,  03:34:31 AM',
    email: 'Oct 4, 2028,  03:34:31 AM',
    role: '2 hours, 38 Minutes',
  },
  {
    name: 'Lindsay Walton',
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
        <section className="mx-5 text-sm text-gray-700">
          <div className="mb-5 flex border-b pb-5">
            <section className="mr-32">Escalation</section>
            <section className="w-full">
              <label className="text-sm text-gray-700">Send an alert notification</label>
              <fieldset className="mt-6">
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
                    <label htmlFor="checkFail" className="ml-3 block text-sm text-gray-700">
                      <div className="flex items-center space-x-2">
                        <span>When a Monitor has failed</span>
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
                    <label htmlFor="checkTime" className="ml-3 block text-sm text-gray-700">
                      <div className="flex items-center space-x-2">
                        <span>When a Monitor is failing for more than</span>
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
                    <label htmlFor="regionFail" className="ml-3 block text-sm text-gray-700">
                      <div className="flex items-center space-x-2">
                        <span>When a Monitor has failed in</span>
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
          <div className="flex items-center">
            <section className="mr-32">Reminders</section>
            <section className="w-full">
              <label className="text-sm text-gray-700">
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
                  <span>reminders, with a</span>
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
      <div className="">
        <div className="flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                      >
                        Status
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-center text-sm font-semibold text-gray-900">
                        From
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-center text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        To
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-center text-sm font-semibold text-gray-900">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center sm:pl-6 md:pl-2">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Degraded
                          </span>
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-center text-sm text-gray-500">
                          {person.title}
                        </td>
                        <td className="hidden whitespace-nowrap py-4 px-3 text-center text-sm text-gray-500 md:table-cell">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-center text-sm text-gray-500">{person.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertSettingsComponent;
