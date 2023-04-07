import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import DeleteBoard from '@/app/components/settings/DeleteBoard';

export default async function ProjectSettings({ params }: any) {
  const session = await getServerSession(authOptions);
  const boardId = params.boardId;
  const boardInfoData = (await prisma.board.findUnique({
    where: {
      id: boardId,
    },
    include: { users: true },
  })) || {
    id: 'N/A',
    title: 'N/A',
    admindId: 'N/A',
    data: 'N/A',
    users: 'N/A',
  };

  const userData = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  const [boardInfo, user] = await Promise.all([boardInfoData, userData]);

  return (
    <main className="grow w-full flex-flex-col p-4">
      <section className="flex justify-between">
        <h1 className="text-2xl">
          Board info for: <span className="font-bold">{boardInfo.title}</span>
        </h1>
        <DeleteBoard
          boardInfo={boardInfo}
          user={user}
          // leaveOrDeleteBoard={leaveOrDeleteBoard}
        />
      </section>
      <hr className="border border-neutral-300 my-2" />
    </main>
  );
}
