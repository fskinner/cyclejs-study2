const idIncrement = (array) => {
  if(array.length === 0) {
    return 0;
  }

  return array[array.length - 1].id + 1
};

const Operations = {
  Add: todoText => state => ({
    items: [ ...state.items,
      {
        id: idIncrement(state.items).toString(),
        text: todoText,
        completed: false
      }
    ],
    archive: state.archive
  }),

  Remove: todoId => state => ({
    items: state.items.filter(x => x.id !== todoId),
    archive: state.archive
  }),

  Mark: (todoId, status) => state => ({
    items: state.items.map(x => {
      if(x.id === todoId) {
        x.completed = status;
      }
      return x;
    }),
    archive: state.archive
  }),

  Archive: completeStatus => state => ({
    items: state.items.filter(x => x.completed !== completeStatus),
    archive: state.archive.concat(state.items.filter(x => x.completed === completeStatus))
  }),

  ToggleEdit: (todoId, status) => state => ({
    items: state.items.map(x => {
      if(x.id === todoId) {
        x.editing = status;
      }
      return x;
    }),
    archive: state.archive
  }),

  SaveEdit: ({id, text}) => state => ({
    items: state.items.map(x => {
      if(x.id === id) {
        x.text = text;
        x.editing = false;
      }
      return x;
    }),
    archive: state.archive
  })
};

export default Operations;
