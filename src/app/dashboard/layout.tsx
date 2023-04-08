import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

type Props = {
  children: React.ReactNode;
};

function DashLayout({ children }: Props): JSX.Element {
  const session = getServerSession(authOptions);

  return (
    <main className=" h-full w-full flex relative">
      {!session || session === null ? (
        <div>
          <h1>You must be signed in to view your dashboard.</h1>
        </div>
      ) : (
        <>
          {/* @ts-expect-error Server Component */}
          <Sidebar />
          {children}
        </>
      )}
    </main>
  );
}

export default DashLayout;
