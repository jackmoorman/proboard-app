import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

type Props = {};

async function page({}: Props) {
  const session = await getServerSession(authOptions);

  return (
    <main className="fade-in grow flex flex-col items-center mt-32">
      {session ? (
        <>
          <h1 className="text-4xl">{`<--`} Click on a board to get started!</h1>
          <h1 className="text-2xl mt-8">
            (Or create one if you don't have any!)
          </h1>
        </>
      ) : null}
    </main>
  );
}

export default page;
