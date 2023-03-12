import { Player } from '@lottiefiles/react-lottie-player';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AlertDetailLayout({ children }: Props) {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="px-1 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Alert #47</h1>
      </div>
      <div className="flex justify-between">
        <section>
          <h1 className="mt-10 text-4xl font-semibold">Incident is Resolved</h1>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="whitespace-nowrap py-2 pr-4 font-medium text-gray-900">Monitor</td>
                  <td className="whitespace-nowrap py-2 text-right text-gray-700">24/05/1995</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-2 pr-4 font-medium text-gray-900">Duration</td>
                  <td className="whitespace-nowrap py-2 text-right text-gray-700">24/05/1995</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-2 pr-4 font-medium text-gray-900">Started At</td>
                  <td className="whitespace-nowrap py-2 text-right text-gray-700">04/11/1980</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-2 pr-4 font-medium text-gray-900">Resolved At</td>
                  <td className="whitespace-nowrap py-2 text-right text-gray-700">04/11/1980</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-2 pr-4 font-medium text-gray-900">Resolved By</td>
                  <td className="whitespace-nowrap py-2 text-right text-gray-700">04/11/1980</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <Player
          className="mr-48"
          autoplay
          loop
          src="https://uptime-admin.s3.us-west-1.amazonaws.com/lottiefiles/alarm-resolved.json"
          style={{ height: '300px', width: '300px' }}
        />
      </div>

      {children}
    </section>
  );
}
