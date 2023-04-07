import LoginButton from './components/buttons/LoginButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <main className="grow flex flex-col text-xl items-center pt-14 w-full max-w-screen-2xl">
      <h1 className="text-4xl font-medium">
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
    </main>
  );
}
