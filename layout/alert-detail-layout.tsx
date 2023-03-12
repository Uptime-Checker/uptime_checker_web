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
      {children}
    </section>
  );
}
