'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  isDisabled: boolean;
  board: any;
  user: any;
};

function RemoveUser({ isDisabled, board, user }: Props) {
  const router = useRouter();

  const handleRemoveUser = async () => {
    const boardId = board.id;
    const userId = user.id;
    const removedUser = await fetch('/api/board/user/remove', {
      method: 'PATCH',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({ boardId, userId }),
    });
    if (removedUser.status !== 200) {
      return alert('Could not remove the user from the board.');
    } else {
      router.refresh();
    }
  };

  const btnActive =
    'text-4xl rotate-45 flex justify-center items-center hover:scale-110 transition-all';

  const btnDisabled =
    'text-4xl rotate-45 flex justify-center items-center text-gray-400';

  return (
    <button
      disabled={isDisabled}
      onClick={handleRemoveUser}
      className={isDisabled ? btnDisabled : btnActive}
    >
      +
    </button>
  );
}

export default RemoveUser;
