'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function BoardList({ boards }: any): any {
  return (
    <nav className="w-full flex flex-col gap-2">
      {boards.map((board: any, index: number) => {
        return (
          <div
            key={index}
            id={board.id}
            className="w-full shadow-md flex justify-between items-center p-3 bg-neutral-100 rounded-md"
          >
            <Link href={`/dashboard/${board.id}`}>
              <p className=" text-xl overflow-hidden grow">{board.title}</p>
            </Link>
            <div className="flex gap-2 justify-end items-center">
              <button
                id={board.id}
                className=" h-4 w-4 flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                id={board.id}
                className=" text-4xl rotate-45 flex justify-center items-center"
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export default BoardList;
