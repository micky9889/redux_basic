import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetch todo
export const fetchTodo = createAsyncThunk("fetchTodo", async () => {
  try {
    const data = await fetch("https://www.melivecode.com/api/users");
    const response = await data.json();
    console.log("fetchTodo response=>", response); // Log the response
    return response;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
});
// fetch todo by ID
export const fetchTodoById = createAsyncThunk("fetchTodoById", async (id) => {
  try {
    const data = await fetch("https://www.melivecode.com/api/users/" + id);
    const response = await data.json();
    console.log("fetchTodoByID response:", response); // Log the response
    return response;
  } catch (error) {
    console.error("Error fetchTodoByID todo:", error);
    throw error;
  }
});
// add todo
export const addTodo = createAsyncThunk("addTodo", async (requestBody) => {
  try {
    const url = "https://www.melivecode.com/api/users/create";
    const headers = {
      "Content-Type": "application/json",
    };
    const data = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });
    const response = await data.json();
    console.log("PostTodoByID response:", response); // Log the response
    return response;
  } catch (error) {
    console.error("Error PostTodoByID todo:", error);
    throw error;
  }
});
// delete todo
export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  try {
    const data = await fetch("https://www.melivecode.com/api/users/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const response = await data.json();
    console.log("DeleteTodo response:", response);
    return response;
  } catch (error) {
    console.error("Error DeleteTodo todo:", error);
    throw error;
  }
});
//update todo
export const updateTodo = createAsyncThunk(
  "updateTodo",
  async (requestBody) => {
    try {
      const url = " https://www.melivecode.com/api/users/update";

      const headers = {
        "Content-Type": "application/json",
      };

      const data = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(requestBody),
      });
      const response = await data.json();
      console.log("UpdateTodo response:", response);
      return response;
    } catch (error) {
      console.error("Error DeleteTodo todo:", error);
      throw error;
    }
  }
);

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
      console.log("fetch.fullfilled=>", action.payload);
    });
    builder.addCase(fetchTodo.rejected, (state) => {
      state.error = true;
    });
    //fetch todo by id
    builder.addCase(fetchTodoById.fulfilled, (state, action) => {
      console.log("fetchByID.fullfilled=>", action);
    });
    // add Todo
    builder.addCase(addTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.data.push(action.payload.user);
      console.log("add.fullfilled=>", action.payload);
    });
    builder.addCase(addTodo.rejected, (state,action) => {
        state.error = true;
        console.log("add.rejected=>", action.payload);
    });

    //delete todo
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      console.log("delete.fullfilled:", action);
    });
    //update todo
    builder.addCase(updateTodo.pending, (state, action) => {
      console.log("addPending_Update:", action);
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      console.log("addFulffiled_Update:", action.payload);
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      console.log("addreject_Update:", action);
    });
  },
});
export default todoSlice.reducer;
