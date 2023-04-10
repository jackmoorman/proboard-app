import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import DeleteBoard from '@/app/components/settings/DeleteBoard';
import RemoveUser from '@/app/components/settings/RemoveUser';
import AddUser from '@/app/components/settings/AddUser';

export default async function ProjectSettings({
  params,
}: {
  params: { boardId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        <h1>You must be signed in to view your settings.</h1>
      </div>
    );
  }
  const boardId = params.boardId;
  const boardInfoData: any = (await prisma.board.findUnique({
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

  const isDisabled: boolean = boardInfo.adminId === user?.id ? false : true;

  return (
    <main className="grow w-full flex-flex-col p-4 flex flex-col items-center">
      <section className="flex justify-between w-full">
        <h1 className="text-2xl">
          Board info for: <span className="font-bold">{boardInfo.title}</span>
        </h1>
        <DeleteBoard boardInfo={boardInfo} user={user} />
      </section>
      <hr className="border border-neutral-300 my-2 w-full" />
      <div className="grow flex justify-between w-full max-w-screen-2xl">
        <section className="w-1/2">
          <h2 className="text-xl my-3">Collaborators:</h2>
          {boardInfo.users.map((user: any, index: number) => {
            return (
              <div
                key={index}
                className="w-1/5 min-w-min max-w-sm flex justify-between items-start shadow-md p-4 rounded-md"
              >
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p>{user.email}</p>
                </div>
                <RemoveUser
                  isDisabled={isDisabled}
                  board={boardInfo}
                  user={user}
                />
              </div>
            );
          })}
        </section>
        <AddUser board={boardInfo} />
      </div>
    </main>
  );
}
