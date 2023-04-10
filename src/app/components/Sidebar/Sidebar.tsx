import React from 'react';
import CreateProject from '../buttons/CreateProject';
import BoardList from './BoardList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

const getUserBoards = async (id: string) => {
  try {
    const boards = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        boards: true,
      },
    });
    if (!boards) throw new Error(`Could not retrieve boards`);
    return boards;
  } catch (err) {
    throw new Error(`Error getting your boards: ${err}`);
  }
};

async function Sidebar() {
  const session = await getServerSession(authOptions);
  if (!session) return <div>Not logged in</div>;
  const user = await getUserBoards(session.user.id);
  const boards = user?.boards;

  return (
    <section className="translate-left shadow-lg w-1/5 min-w-250 max-w-xs flex flex-col items-start gap-3 p-4">
      <h1 className=" font-normal text-2xl">Boards</h1>
      <hr className=" border-slate-800 w-full" />
      <CreateProject />
      {!boards ? "You don't have any projects." : <BoardList boards={boards} />}
    </section>
  );
}

export default Sidebar;
