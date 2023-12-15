import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetch todo
export const fetchTodo = createAsyncThunk("fetchTodo", async () => {
  const data = await fetch("https://www.melivecode.com/api/users");
  return data.json();
});
// fetch todo by ID
export const fetchTodoById = createAsyncThunk("fetchTodoById", async (id) => {
  const data = await fetch("https://www.melivecode.com/api/users/" + id);
  return data.json();
});
// add todo
export const addTodo = createAsyncThunk("addTodo", async (requestBody) => {
  const url = "https://www.melivecode.com/api/users/create";

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestBody),
  });

  return response.json();
});
// delete todo
export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  const data = await fetch("https://www.melivecode.com/api/users/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  return data.json();
});
//update todo
export const updateTodo = createAsyncThunk(
  "updateTodo",
  async (requestBody) => {
    const url = " https://www.melivecode.com/api/users/update";
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(requestBody),
    });
    return response.json();
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
    todoDetail: {},
    isLoading: false,
    success: false,
    error: false,
  },
  extraReducers: (builder) => {
    // fetch todo list
    builder.addCase(fetchTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(fetchTodo.rejected, (state) => {
      state.error = true;
    });

    // fetch todo by id
    builder.addCase(fetchTodoById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodoById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.todoDetail = action.payload.user;
    });
    builder.addCase(fetchTodoById.rejected, (state) => {
      state.error = true;
    });

    // fetch todo by id
    builder.addCase(updateTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      console.log(action.payload);
      const updatedTodo = action.payload;
      const todoIndex = state.data.findIndex(
        (item) => item.id === updateTodo.id
      );
      if (todoIndex !== -1) {
        state.data[todoIndex] = updatedTodo;
      }
    });
    builder.addCase(updateTodo.rejected, (state) => {
      state.error = true;
    });

    // // add Todo
    // builder.addCase(addTodo.fulfilled, (state, action) => {
    //   state.data.push(action.payload.user);
    // });
    // //delete todo
    // builder.addCase(deleteTodo.fulfilled, (state, action) => {});
    // //update todo
    // builder.addCase(updateTodo.pending, (state, action) => {
    //   console.log("addPending_Update:", action);
    // });
    // builder.addCase(updateTodo.fulfilled, (state, action) => {
    //   console.log("addFulffiled_Update:", action);
    // });
    // builder.addCase(updateTodo.rejected, (state, action) => {
    //   console.log("addreject_Update:", action);
    // });
  },
});

export default todoSlice.reducer;
