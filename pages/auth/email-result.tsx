import LoadingBubbleIcon from 'components/icon/loading-bubble';
import TwoFactorAuthIcon from 'components/icon/two-factor-auth';
import { useState } from 'react';

export default function EmailResult() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Confirming your account</h2>
        </div>
        <div className="mt-8 mb-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex flex-col items-center bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <TwoFactorAuthIcon className="h-32" />
            <div className="mt-8 space-y-6">
              <div className="text-center">
                <p>{email === '' ? 'Checking your email' : `Confirming your email ${email}`}</p>
                <LoadingBubbleIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
