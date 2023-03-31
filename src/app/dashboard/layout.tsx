import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

type Props = {
  children: React.ReactNode;
};

function DashLayout({ children }: Props) {
  return (
    <main className=" h-full w-full flex relative">
      <Sidebar />
      {children}
    </main>
  );
}

export default DashLayout;
