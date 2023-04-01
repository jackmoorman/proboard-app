'use client';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

type CardProps = {
  id: string;
  columnId: string;
  index: number;
  status: string;
  value: string;
  deleteCard: any;
};

function Card({ id, columnId, index, status, value, deleteCard }: CardProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          id={id}
          className=" shadow-md flex justify-between items-start p-3 bg-neutral-100 rounded-md"
        >
          <p className="grow flex justify-start items-start">{value}</p>
          <button
            onClick={() => deleteCard(columnId, id, index)}
            className="text-3xl rotate-45 flex justify-center items-start"
          >
            +
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
