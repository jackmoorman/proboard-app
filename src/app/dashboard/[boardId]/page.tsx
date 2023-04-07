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
    });
    if (!board) throw new Error('Could not find board');
    return board;
  } catch (err) {
    throw new Error(`Could not retrieve board: ${err}`);
  }
};

async function BoardPage({ params }: any) {
  const board = await getBoardData(params.boardId);
  const { title } = board;
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <main className="grow flex flex-col p-3">
      <nav className="flex justify-between items-center pl-6 pr-6">
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
}

export default BoardPage;

// import React from 'react';
// import Link from 'next/link';
// import { prisma } from '@/lib/prisma';

// const getBoardData = async (id: string) => {
//   try {
//     const board = await prisma.board.findFirst({
//       where: {
//         id: id,
//       },
//     });
//     if (!board) throw new Error('Could not find board');
//     return board;
//   } catch (err) {
//     throw new Error(`Could not retrieve board: ${err}`);
//   }
// };

// async function BoardLayout({ params, children }: any) {
//   const board = await getBoardData(params.boardId);
//   const { title } = board;
//   return (
//     <main className="grow flex flex-col">
//       <nav className="flex justify-between items-center p-4 pl-6 pr-6">
//         <h1 className="text-3xl">{title}</h1>
//         <Link
//           href={`/settings/${params.boardId}`}
//           className="text-xl flex justify-center items-center shadow p-3 rounded-md hover:scale-105 hover:bg-neutral-300 transition-all"
//         >
//           Settings
//         </Link>
//       </nav>
//       {children}
//     </main>
//   );
// }

// export default BoardLayout;
