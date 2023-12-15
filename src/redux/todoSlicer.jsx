import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetch todo
export const fetchTodo = createAsyncThunk("fetchTodo", async () => {
  const data = await fetch("https://www.melivecode.com/api/users");
  return data.json();
});
// fetch todo by ID
export const fetchTodoById = createAsyncThunk("fetchTodoById", async (id) => {
  const data = await fetch("https://www.melivecode.com/api/users/"+id);
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
 const data= await fetch("https://www.melivecode.com/api/users/delete", {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({"id":id}),
});
  return data.json();
});
//update todo
export const updateTodo = createAsyncThunk("updateTodo", async (requestBody) => {
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
  });

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    // fetch todo
    builder.addCase(fetchTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodo.rejected, (state) => {
      state.error = true;
    });
    //fetch todo by id
    builder.addCase(fetchTodoById.fulfilled, (state,action) => {
    });
    // add Todo
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.data.push(action.payload.user);
    });
    //delete todo
    builder.addCase(deleteTodo.fulfilled, (state, action) => {  
    });
    //update todo
    builder.addCase(updateTodo.pending, (state, action) => {
        console.log("addPending_Update:",action);
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
        console.log("addFulffiled_Update:",action);
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
        console.log("addreject_Update:",action);
    });
  },
});
export default todoSlice.reducer;
