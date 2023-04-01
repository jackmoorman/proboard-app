'use client';
import React from 'react';
import { useState, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';

function Column({
  column,
  index,
  allColumns,
  setColumns,
  boardId,
  addCard,
  deleteCard,
}: any) {
  const [editColumn, setDisplay] = useState(false);
  const [cardForm, setCardForm] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLInputElement>(null);
  const cards = column.cards;

  const changeColName = async (e: any) => {
    e.preventDefault();
    const newName = nameRef?.current?.value;
    if (!newName || newName === '') return alert('Column must have a name.');
    const allCols = [...allColumns];
    for (let i = 0; i < allCols.length; i++) {
      if (allCols[i].id === column.id) {
        allCols[i].title = newName;
        break;
      }
    }
    setDisplay(false);
    setColumns([...allCols]);

    const body = {
      boardId,
      allCols,
    };

    fetch('/api/board', {
      method: 'PUT',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(body),
    });
  };

  const deleteColumn = async () => {
    const allCols = allColumns.filter((col: any) => {
      if (col.id !== column.id) return true;
    });
    setColumns([...allCols]);

    const body = {
      boardId,
      allCols,
    };

    fetch('/api/board', {
      method: 'PUT',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(body),
    });
  };

  const handleAddCard = () => {
    const newCard = cardRef?.current?.value;
    if (!newCard || newCard === '') return alert('Please enter a task name');
    addCard(newCard, column.id);
    setCardForm(false);
  };

  return (
    <Draggable key={column.id} draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="flex flex-col w-72 p-3 m-2 shadow-column rounded"
        >
          <div className="flex justify-between items-center">
            {!editColumn ? (
              <>
                <h1 onClick={() => setDisplay(true)}>{column.title}</h1>
                <button
                  onClick={() => deleteColumn()}
                  className="shadow-md p-1 rounded-md hover:scale-105 hover: hover:bg-neutral-300 transition-all"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <input
                  ref={nameRef}
                  type="text"
                  placeholder={column.title}
                  className="p-1 rounded-md"
                />
                <form
                  onSubmit={(e) => changeColName(e)}
                  className="flex justify-end items-center gap-3"
                >
                  <button
                    type="submit"
                    className="shadow-md p-1 rounded-md hover:scale-105 hover: hover:bg-neutral-300 transition-all"
                  >
                    OK
                  </button>
                </form>
                <button
                  onClick={() => setDisplay(false)}
                  className="shadow-md p-1 rounded-md hover:scale-105 hover: hover:bg-neutral-300 transition-all"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
          <div className="flex justify-between mt-2">
            <button
              onClick={() => setCardForm((prev) => !prev)}
              className="shadow-md p-1 rounded-md hover:scale-105 hover: hover:bg-neutral-300 transition-all"
            >
              {!cardForm ? 'Add Card' : 'Cancel'}
            </button>
            {cardForm ? (
              <>
                <input ref={cardRef} type="text" className="p-1 rounded-md" />
                <button
                  onClick={() => handleAddCard()}
                  className="shadow-md p-1 rounded-md hover:scale-105 hover: hover:bg-neutral-300 transition-all"
                >
                  Submit
                </button>
              </>
            ) : null}
          </div>
          <hr className="border border-neutral-300 mt-3 mb-2" />
          <Droppable droppableId={column.id} type="card">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grow flex flex-col gap-3 border"
              >
                {cards.map(({ id, status, value }: any, index: number) => {
                  return (
                    <Card
                      key={id}
                      id={id}
                      columnId={column.id}
                      index={index}
                      status={status}
                      value={value}
                      deleteCard={deleteCard}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
