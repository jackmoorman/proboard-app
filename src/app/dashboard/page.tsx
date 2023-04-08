import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

type Props = {};

async function page({}: Props) {
  const session = await getServerSession(authOptions);

  return (
    <main className="grow">
      {session ? <h1>Click on a board to get started!</h1> : null}
    </main>
  );
}

export default page;
