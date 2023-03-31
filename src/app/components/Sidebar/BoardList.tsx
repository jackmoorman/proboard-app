'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function BoardList({ boards }: any) {
  console.log(boards);
  return (
    <nav className="w-full flex flex-col gap-2">
      {boards.map((board: any, index: number) => {
        return (
          <div
            key={index}
            id={board.id}
            className="w-full shadow-md flex justify-between items-center p-3 bg-neutral-100 rounded-md"
          >
            <p className=" text-xl overflow-hidden">{board.title}</p>
            <div className="flex gap-2 justify-end items-center">
              <button
                id={board.id}
                className=" h-4 w-4 flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faBars} />
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
