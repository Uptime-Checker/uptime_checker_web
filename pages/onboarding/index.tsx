import LoadingIcon from 'components/icon/loading';
import { FormEvent, useState } from 'react';

export default function Onboarding() {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full py-32 sm:mx-auto sm:max-w-md sm:px-6 lg:px-8">
        <form
          className="flex flex-col items-center justify-center space-y-6 sm:mx-auto sm:w-full sm:max-w-2xl"
          onSubmit={handleFormSubmit}
        >
          <h1 className="px-4 text-center text-4xl font-bold text-gray-900 sm:px-0">Let's get started</h1>
          <div className="w-full bg-white px-4 py-5 drop-shadow-md sm:rounded-lg sm:p-6">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        disabled={loading}
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        placeholder="Aaron"
                        aria-invalid="false"
                        aria-describedby="error-firstName-required"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        disabled={loading}
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        placeholder="Jones"
                        aria-invalid="false"
                        aria-describedby="error-lastName-required"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="organisation" className="block text-sm font-medium text-gray-700">
                      Organisation
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        disabled={loading}
                        type="text"
                        name="organisation"
                        id="organisation"
                        autoComplete="organization"
                        placeholder="Twitter Inc."
                        aria-invalid="false"
                        aria-describedby="error-organisation-required"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-10 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? <LoadingIcon className="-ml-1 mr-3 h-5 w-5 animate-spin text-indigo-700" /> : null}
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
