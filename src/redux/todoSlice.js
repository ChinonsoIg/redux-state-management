import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getTodoAsync = createAsyncThunk(
  "todos/getTodoAsync",
  async () => {
    const resp = await fetch("https://611e0b357d273a0017e2f9e9.mockapi.io/api/myAPI")
    if (resp.ok) {
      const todos = await resp.json();
      return { todos }
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const resp = await fetch("https://611e0b357d273a0017e2f9e9.mockapi.io/api/myAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      return { todo }
    }

  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/toggleCompleteAsync",
  async (payload) => {
    const resp = await fetch(`https://611e0b357d273a0017e2f9e9.mockapi.io/api/myAPI/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        completed: payload.completed 
      }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      return { todo }
    }

  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const resp = await fetch(`https://611e0b357d273a0017e2f9e9.mockapi.io/api/myAPI/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: payload.id }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      return { todo }
    }

  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
			const todo = {
				title: action.payload.title,
				completed: false,
			};
			state.push(todo);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].completed = action.payload.completed;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
  extraReducers: {
    [getTodoAsync.fulfilled]: (state, action) => {
      return action.payload.todos
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todo.id
      );
      state[index].completed = action.payload.todo.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      console.log('action: ',action)
      return state.filter((todo) => todo.id !== action.payload.todo.id);
    },
  },
});


export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;