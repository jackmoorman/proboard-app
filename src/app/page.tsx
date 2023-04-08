import LoginButton from './components/buttons/LoginButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <main className="fade-in grow flex flex-col text-xl items-center pt-14 w-full max-w-screen-2xl">
      <h1 className=" text-4xl md:text-6xl font-medium">
        Welcome to <span className="text-sky-700 font-medium">pro</span>Board!
      </h1>

      {session ? (
        <>
          <h2 className=" text-2xl mt-5">Hello, {session?.user?.name}!</h2>
        </>
      ) : (
        <>
          <p className="text-xl m-6 mt-12">Sign in below to get started:</p>
          <LoginButton />
        </>
      )}

      <section className="translate-left m-12 grid grid-cols-1 shadow-lg rounded-lg p-6 lg:grid-cols-2">
        <h2 className="text-3xl md:text-5xl flex justify-center items-center my-5">
          What is&nbsp;<span className="text-sky-700 font-medium">pro</span>
          Board?
        </h2>
        <article className="text-2xl">
          <p className="">
            proBoard is an open-source, community driven platform built for
            kanban board-style collaboration for small teams.
          </p>
          <p className="mt-3">
            proBoard was started in 2023 to be a free-of-charge collaboration
            software modelled after programs like Trello and Jira. proBoard aims
            to be a cost-effective alternative in the market for smaller teams
            and organizations.
          </p>
        </article>
      </section>

      <section className="fade-and-translate-up m-12 flex flex-col items-center p-8 text-2xl">
        <h3 className="text-3xl mb-6">Want to contribute?</h3>
        <p>
          Check out the{' '}
          <Link
            href="https://github.com/jackmoorman/proboard-app"
            className="text-sky-700"
            target="_blank"
          >
            GitHub Repo!
          </Link>
        </p>
      </section>

      <footer className="translate-up flex p-7 justify-center items-center w-full gap-5 absolute bottom-0">
        <p>proBoard &copy; 2023</p>
        <Link
          href="https://github.com/jackmoorman/proboard-app"
          target="_blank"
          className="hover:scale-105 transition-all"
        >
          GitHub
        </Link>
      </footer>
    </main>
  );
}
