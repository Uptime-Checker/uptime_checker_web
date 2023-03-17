const AlertSettingsComponent = () => {
  return (
    <div className="my-10">
      <section className="mx-5 text-sm text-gray-700">
        <div className="flex">
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
                        className="w-[50px] rounded-md border-0 bg-gray-100 py-0.5 pl-3 pr-0 text-sm text-gray-900 focus:ring-0"
                        defaultValue="1"
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
                        className="w-[50px] rounded-md border-0 bg-gray-100 py-0.5 pl-3 pr-0 text-sm text-gray-900 focus:ring-0"
                        defaultValue="1"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
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
                        className="w-[50px] rounded-md border-0 bg-gray-100 py-0.5 pl-3 pr-0 text-sm text-gray-900 focus:ring-0"
                        defaultValue="1"
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
        <div>
          <section></section>
          <section></section>
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default AlertSettingsComponent;
