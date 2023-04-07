import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import BoardCard from '../components/settings/BoardCard';

type Props = {};

type Board = {
  id: string;
  title: string;
  adminId: string;
  data: any;
};

export default async function page({}: Props) {
  const session = await getServerSession(authOptions);
  const userData = (await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      boards: true,
    },
  })) || { boards: [] };

  const boards: Board[] = userData.boards;

  return (
    <main className="grow w-full p-5 text-slate-800">
      <h1 className="text-3xl">{session.user.name}'s Boards:</h1>
      <hr className="border border-neutral-300 my-2" />

      <section className="flex flex-wrap justify-center gap-4">
        {boards.map((board, index) => (
          <BoardCard key={index} board={board} />
        ))}
      </section>
    </main>
  );
}
