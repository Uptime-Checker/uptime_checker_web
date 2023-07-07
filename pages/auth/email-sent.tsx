import EmailSentIcon from 'components/icon/email-sent';
import { CacheKey, cacheUtil } from 'lib/cache';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function EmailSent() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const email = cacheUtil.get(CacheKey.Email)!;
    setEmail(email);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Auth</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Check your email</h2>
        </div>
        <div className="mb-8 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex flex-col items-center bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <EmailSentIcon className="h-32" />
            <div className="mt-8 space-y-6">
              <div className="text-center">
                <p>
                  We have sent your magic link to <b>{email}</b>.
                </p>
                <p className="mt-2">Click on the link in your email to get started.</p>
                <p className="mt-2">You can close this tab.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
