import React from 'react';
import Link from 'next/link';
import LoginHeader from './buttons/LoginHeader';

type Props = {};

function Header({}: Props) {
  return (
    <header className="translate-down border w-full text-lg font-medium flex justify-between p-4 shadow-md">
      <h1 className=" text-3xl text-sky-700 hover:scale-105 transition-all">
        <Link className="font-bold hover:scale-105 transition-all" href="/">
          pro<span className=" text-slate-800 font-bold">Board</span>
        </Link>
      </h1>
      <nav className="flex justify-between items-center gap-7">
        <Link className="hover:scale-105 transition-all" href="/about">
          About
        </Link>
        <Link className="hover:scale-105 transition-all" href="/dashboard">
          Dashboard
        </Link>
        <LoginHeader />
      </nav>
    </header>
  );
}

export default Header;
