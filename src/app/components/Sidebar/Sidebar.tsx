import React from 'react';
import CreateProject from '../buttons/CreateProject';
import BoardList from './BoardList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

type Props = {};

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

async function Sidebar({}: Props) {
  const session = await getServerSession(authOptions);

  const user = await getUserBoards(session.user.id);
  const boards = user?.boards;

  return (
    <section className="shadow-lg w-1/5 max-w-xs flex flex-col items-start gap-3 p-4">
      <h1 className=" font-normal text-2xl">Boards</h1>
      <hr className=" border-slate-800 w-full" />
      <CreateProject />
      {!boards ? "You don't have any projects." : <BoardList boards={boards} />}
      {/* <BoardList boards={boards} /> */}
    </section>
  );
}

export default Sidebar;
