'use client';
import React from 'react';
import Column from './Column';

function Board({ board }: any) {
  console.log(board);
  console.log(board.data);
  return (
    <section className="grow w-full">
      {board.data.map((column: any, index: number) => {
        return <Column key={index} columns={board.data} index={index} />;
      })}
    </section>
  );
}

export default Board;
