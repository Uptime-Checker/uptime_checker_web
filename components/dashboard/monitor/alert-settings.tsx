type Props = {
  text: String;
};

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
    </>
  );
};

export default AlertSettingsComponent;
