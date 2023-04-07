'use client';
import React from 'react';
import Column from './Column';
import { useState, useRef, useEffect } from 'react';
import { createColumn, createCard } from './columnHelper';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorderCards, reorderColumns } from './reorder';

//@ts-nocheck

console.log('ENVS: ', process.env);
console.log('WSPORT: ', process.env.WSPORT);

const socket = new WebSocket('ws://localhost:3005');

type ColumnType = {
  id: string;
  title: string | undefined;
  cards: any;
};

function Board({ board, uid }: any) {
  const [columnForm, setDisplay] = useState(false);
  const [columns, setColumns] = useState<ColumnType[]>([]);

  const newColName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setColumns([...board.data]);
    const userData = {
      boardId: board.id,
      userId: uid,
      method: 'join',
    };

    socket.send(JSON.stringify(userData));

    return () => {
      console.log('reached return');
      const userData = {
        boardId: board.id,
        userId: uid,
        method: 'leave',
      };
      socket.send(JSON.stringify(userData));
    };
  }, []);

  const emitBoardUpdates = (allCols: any) => {
    console.log(socket.readyState);
    const msg = {
      boardId: board.id,
      userId: uid,
      method: 'update',
      columns: allCols,
    };

    socket.send(JSON.stringify(msg));
  };

  // socket.onopen = (event) => {
  //   console.log('opened');
  //   console.log(event);
  //   const userData = {
  //     boardId: board.id,
  //     userId: uid,
  //     method: 'join',
  //   };
  //   socket.send(JSON.stringify(userData));
  // };

  socket.onmessage = (event) => {
    // console.log('RECEIVED: ', JSON.parse(event.data));
    const receivedData = JSON.parse(event.data);
    setColumns([...receivedData.columns]);
  };

  // socket.onclose = (event) => {
  //   console.log('closed');
  // };

  const fetcher = async (allCols: any) => {
    const boardId = board.id;

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

  const addColumn = async (e: any) => {
    e.preventDefault();
    const boardId = board.id;
    const title = newColName?.current?.value;
    const newCol = createColumn(title);
    const allCols = [...columns, newCol];
    setColumns([...allCols]);

    fetcher(allCols);
  };

  const deleteCard = async (
    columnId: string,
    cardId: string,
    index: number
  ) => {
    const allCols = [...columns];
    const boardId = board.id;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].id === columnId) {
        console.log(columns[i].title);
        allCols[i].cards.splice(index);
      }
    }
    setColumns([...allCols]);
    fetcher(allCols);
  };

  const addCard = async (value: string, columnId: string) => {
    const newCard = createCard(value);
    const allCols = [...columns];
    for (let i = 0; i < columns.length; i++) {
      if (columnId === columns[i].id) {
        allCols[i].cards.unshift(newCard);
      }
    }
    setColumns([...allCols]);
    fetcher(allCols);
  };

  const handleDragEnd = async (result: any) => {
    if (!result) return;
    if (!result.destination) return;
    let allCols: any = [...columns];
    if (result.type === 'card') {
      allCols = reorderCards(result, columns);
      setColumns([...allCols]);
      fetcher(allCols);
      emitBoardUpdates(allCols);
    }
    if (result.type === 'column') {
      allCols = reorderColumns(result, columns);
      setColumns([...allCols]);
      fetcher(allCols);
      emitBoardUpdates(allCols);
    }
    return;
  };

  return (
    <section className="grow flex flex-col items-start p-3 pb-0 gap-3">
      <div className="flex gap-3 justify-start items-center">
        <button
          onClick={() => setDisplay((prev) => !prev)}
          className="text-lg p-1 flex justify-center items-center shadow-md rounded-md hover:scale-105 hover:bg-neutral-300 transition-all"
        >
          {!columnForm ? 'Add Column' : 'Cancel'}
        </button>
        {columnForm ? (
          <form onSubmit={(e) => addColumn(e)} className="h-full flex gap-3">
            <input
              ref={newColName}
              type="text"
              placeholder="New Column"
              className="p-1 text-md rounded-md text-slate-800 h-full"
            />
            <button
              type="submit"
              className="text-md p-1 flex justify-center items-center shadow-md rounded-md hover:scale-105 hover:bg-neutral-300 transition-all"
            >
              Add
            </button>
          </form>
        ) : null}
      </div>
      <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grow w-full flex flex-start overflow-y-auto"
            >
              {columns.map((column: any, index: number) => {
                return (
                  <Column
                    key={index}
                    column={column}
                    index={index}
                    allColumns={columns}
                    setColumns={setColumns}
                    boardId={board.id}
                    addCard={addCard}
                    deleteCard={deleteCard}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}

export default Board;
