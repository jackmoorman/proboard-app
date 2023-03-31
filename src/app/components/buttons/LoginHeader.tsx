'use client';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

type Props = {};

function LoginHeader({}: Props) {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <p>{session?.user?.name}</p>
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
