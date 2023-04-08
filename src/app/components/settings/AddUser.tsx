'use client';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function AddUser({ board }: any) {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleAddUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const boardId = board.id;
    const addedUser = await fetch('/api/board/user/add', {
      method: 'PATCH',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({ boardId, email }),
    });
    if (addedUser.status !== 200) {
      return alert('Could not find the user with specified email.');
    } else {
      setEmail('');
      router.refresh();
    }
  };

  return (
    <form onSubmit={(e) => handleAddUser(e)} className="grow w-1/2">
      <h1>Add User by Email:</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        className="w-full p-2 text-lg rounded-md shadow-md"
      />
      <button
        type="submit"
        className="text-lg p-1 px-2 my-3 flex justify-center items-center shadow-md rounded-md hover:scale-105 hover:bg-neutral-300 transition-all cursor-pointer"
      >
        Add User
      </button>
    </form>
  );
}

export default AddUser;
