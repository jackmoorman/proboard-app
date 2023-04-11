'use client';
import React from 'react';
import Column from './Column';
import { useState, useRef, useEffect } from 'react';
import { createColumn, createCard } from './columnHelper';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorderCards, reorderColumns } from './reorder';

type ColumnType = {
  id: string;
  title: string | undefined;
  cards: any;
};

function Board({ board, uid }: any) {
  const [columnForm, setDisplay] = useState(false);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [socket, setSocket] = useState<any>(null);

  const newColName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setColumns([...board.data]);
    console.log('Trying to connect to WS Server...');
    //@ts-expect-error
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
    if (ws.readyState === WebSocket.CONNECTING) console.log('Connecting...');
    setSocket(ws);

    ws.onopen = (event: any) => {
      const userData = {
        boardId: board.id,
        userId: uid,
        method: 'join',
      };
      ws.send(JSON.stringify(userData));
    };

    ws.onmessage = (event: any) => {
      const receivedData = JSON.parse(event.data);
      setColumns([...receivedData.columns]);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        const userData = {
          boardId: board.id,
          userId: uid,
          method: 'leave',
        };
        ws.send(JSON.stringify(userData));
        ws.close();
      }
    };
  }, []);

  const emitBoardUpdates = (allCols: any) => {
    const msg = {
      boardId: board.id,
      userId: uid,
      method: 'update',
      columns: allCols,
    };

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg));
    } else {
      return console.log('Socket not open');
    }
  };

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
    <section className="fade-and-translate-up grow w-full flex flex-col items-start p-3 pb-0 gap-3 relative">
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
              className="grow flex flex-start overflow-x-auto"
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
