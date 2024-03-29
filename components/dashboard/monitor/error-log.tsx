const people = [
  {
    name: 'Bad Request',
    title: '400',
    email: 'Frankfurt, Germany',
    role: 'Bad Request, Try Again',
    time: '5:39 PM, Oct 4, 2022',
  },
  { name: 'Timeout', title: '500', email: 'California, USA', role: '', time: '5:21 PM, Oct 4, 2022' },
];

const ErrorLogsComponent = () => {
  return (
    <section className="mt-5">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Error Logs</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the errors we logged when running checks for this monitor
          </p>
        </div>
      </div>
      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Type
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Code
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Region
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Text
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
              >
                Detected At
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {people.map((person) => (
              <tr key={person.email}>
                <td className="w-auto max-w-none py-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {person.name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">Status Code {person.title}</dd>
                    <dt className="sr-only">Email</dt>
                    <dd className="mt-1 truncate text-gray-500">{person.email}</dd>
                    <dt className="sr-only md:hidden">Time</dt>
                    <dd className="mt-1 truncate text-gray-500 md:hidden">{person.time}</dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{person.title}</td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{person.email}</td>
                <td className="px-3 py-4 text-sm text-gray-500">{person.role}</td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{person.time}</td>
                <td className="py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    View<span className="sr-only">, {person.name}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ErrorLogsComponent;
