import React from 'react';
import Link from 'next/link';
import Board from '@/app/components/Board/Board';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const getBoardData = async (id: string) => {
  try {
    const board = await prisma.board.findFirst({
      where: {
        id: id,
      },
      include: { users: true },
    });
    if (!board) throw new Error('Could not find board');
    return board;
  } catch (err) {
    throw new Error(`Could not retrieve board: ${err}`);
  }
};

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const checkForUser = (users: User[], userId: string) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userId) {
      return true;
    }
  }
  return false;
};

async function BoardPage({ params }: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        <h1>You must be signed in to view your Board.</h1>
      </div>
    );
  }
  const board = await getBoardData(params.boardId);

  const userIsMember = checkForUser(board.users, session.user.id);

  const { title } = board;

  if (userIsMember) {
    return (
      <main className="grow flex flex-col p-3 relative">
        <nav className="w-full flex justify-between items-center pl-6 pr-6">
          <h1 className="text-3xl">{title}</h1>
          <Link
            href={`/settings/${params.boardId}`}
            className="text-xl flex justify-center items-center shadow p-3 rounded-md hover:scale-105 hover:bg-neutral-300 transition-all"
          >
            Settings
          </Link>
        </nav>
        <hr className="border border-neutral-300 m-2" />
        <Board board={board} uid={session.user.id} />
      </main>
    );
  } else {
    return (
      <div>
        <h1>You must be a member of this board to view it.</h1>
      </div>
    );
  }
}

export default BoardPage;
