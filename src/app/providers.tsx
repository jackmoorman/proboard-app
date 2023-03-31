'use client';

import { SessionProvider } from 'next-auth/react';

type SessionProps = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: SessionProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
