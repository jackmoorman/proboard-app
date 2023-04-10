export function reorderCards(result: any, columns: any) {
  const { source, destination, draggableId } = result;
  if (!destination) return;
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  )
    return;
  const cols = [...columns];
  let card;

  // removing task from source array:
  for (let i = 0; i < cols.length; i++) {
    if (cols[i].id === source.droppableId) {
      card = cols[i].cards.splice(source.index, 1);
      break;
    }
  }

  // add task to new array
  for (let i = 0; i < cols.length; i++) {
    if (cols[i].id === destination.droppableId) {
      cols[i].cards.splice(destination.index, 0, ...card);
      break;
    }
  }

  return cols;
}

export function reorderColumns(result: any, columns: any) {
  const { source, destination } = result;
  if (!destination) return;
  let cols = [...columns];
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  )
    return;

  const movedCol = cols.splice(source.index, 1);
  cols.splice(destination.index, 0, ...movedCol);
  return cols;
}
