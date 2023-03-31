'use client';
import React from 'react';
import { useSession, signIn } from 'next-auth/react';

type Props = {};

function LoginButton({}: Props) {
  return (
    <button
      onClick={() => signIn()}
      className="shadow-md shadow-slate-400 p-3 rounded-md hover:scale-105 transition-all"
    >
      Sign In
    </button>
  );
}

export default LoginButton;
