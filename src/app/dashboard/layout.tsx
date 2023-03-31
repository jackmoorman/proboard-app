import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

type Props = {
  children: React.ReactNode;
};

function DashLayout({ children }: Props): JSX.Element {
  return (
    <main className=" h-full w-full flex relative">
      {/* @ts-expect-error Server Component */}
      <Sidebar />
      {children}
    </main>
  );
}

export default DashLayout;
