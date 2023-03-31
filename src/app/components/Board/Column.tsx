'use client';
import React from 'react';

function Column({ columns, index }: any) {
  return (
    <div className="grow h-full w-72 p-3 border border-black">
      <div className="flex justify-between items-center">
        <h1>{columns[index].title}</h1>
        <button className="shadow-md p-1 rounded-md hover:scale-105 hover: hover:bg-neutral-300 transition-all">
          Delete
        </button>
      </div>
      <hr className="border border-neutral-300 mt-3 mb-2" />
    </div>
  );
}

export default Column;
