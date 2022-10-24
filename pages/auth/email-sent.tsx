import EmailSentIcon from 'components/icon/email-sent';

export default function EmailSent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Check your email</h2>
        </div>
        <div className="mt-8 mb-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex flex-col items-center bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <EmailSentIcon className="w-40" />
            <div className="mt-8 space-y-6">
              <div className="text-center">
                <p>
                  We have sent your magic link to <b>mr.k779@outlook.com</b>.
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
