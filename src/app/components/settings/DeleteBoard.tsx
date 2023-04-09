'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

function DeleteBoard({ boardInfo, user }: any) {
  const router = useRouter();

  const leaveOrDeleteBoard = async () => {
    if (boardInfo.adminId === user.id) {
      const res = await fetch('/api/board', {
        method: 'DELETE',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify({
          boardId: boardInfo.id,
        }),
      });
      console.log(res);
      if (res.status === 200 && res.ok === true) {
        router.refresh();
        router.push('/settings');
      }
    } else {
      const res = await fetch('/api/board/user/remove', {
        method: 'PATCH',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify({
          boardId: boardInfo.id,
          userId: user.id,
        }),
      });
      if (res.status === 200 && res.ok === true) {
        router.push('/settings');
      }
    }
  };

  return (
    <button
      onClick={leaveOrDeleteBoard}
      className="text-lg p-1 px-2 flex border border-red-500 justify-center items-center shadow-md rounded-md hover:scale-105 hover:bg-neutral-300 transition-all cursor-pointer"
    >
      {boardInfo.adminId === user.id ? 'Delete Board' : 'Leave Board'}
    </button>
  );
}

export default DeleteBoard;
