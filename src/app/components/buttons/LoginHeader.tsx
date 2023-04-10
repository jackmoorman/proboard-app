'use client';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

type Props = {};

function LoginHeader({}: Props) {
  const { data: session } = useSession();
  console.log(session);

  const imgSrc = session?.user?.image || '/vercel.svg';

  return (
    <>
      {session ? (
        <>
          <p>{session?.user?.name}</p>
          <Image
            src={imgSrc}
            alt="profile picture"
            height={40}
            width={40}
            className="rounded-full"
          />
          <button
            onClick={() => signOut()}
            className="hover:scale-105 transition-all"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn()}
          className="hover:scale-105 transition-all"
        >
          Sign In
        </button>
      )}
    </>
  );
}

export default LoginHeader;
