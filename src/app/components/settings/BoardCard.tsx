import React from 'react';
import Link from 'next/link';

type Board = {
  id: string;
  title: string;
  adminId: string;
  data: any;
};

type Props = {
  board: Board;
};

function Project({ board }: Props) {
  const { id, title, adminId, data } = board;

  return (
    <div className="w-full min-w-min max-w-md h-28 shadow-md flex justify-between items-start p-3 bg-neutral-100 rounded-md">
      <div className="grow h-full flex flex-col justify-between">
        <h1 className="text-2xl">{title}</h1>
        <p>
          <span className="font-medium">ID:</span> {id}
        </p>
      </div>
      <Link
        href={`/settings/${id}`}
        className="text-lg p-1 px-2 flex justify-center items-center shadow-md rounded-md hover:scale-105 hover:bg-neutral-300 transition-all"
      >
        Edit
      </Link>
    </div>
  );
}

export default Project;
