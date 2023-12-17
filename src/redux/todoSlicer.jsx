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
// export const fetchTodoById = createAsyncThunk("fetchTodoById", async (id) => {
//   try {
//     const data = await fetch("https://www.melivecode.com/api/users/" + id);
//     const response = await data.json();
//     console.log("fetchTodoByID response:", response); // Log the response
//     return response;
//   } catch (error) {
//     console.error("Error fetchTodoByID todo:", error);
//     throw error;
//   }
// });
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
    return response;
  } catch (error) {
    throw new Error(error);
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
      return response.user;
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
    todoDetail: {}, //to store single todo data when fetching from server
    error: false,
    success: false,
    message: "",
    status: "",
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.todoDetail = {};
      state.error = false;
      state.success = false;
      state.message = "";
      state.status = "";
    },
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
    builder.addCase(fetchTodoById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodoById.fulfilled, (state, action) => {
      console.log(action.payload.user);
      state.isLoading = false;
      state.todoDetail = action.payload.user;
    });
    builder.addCase(fetchTodoById.rejected, (state) => {
      state.error = true;
    });




    // add Todo
    builder.addCase(addTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;

      if (action.payload.status === "ok") {
        state.status = "ok";
        state.success = true;
        state.data.push(action.payload.user);
      } else {
        state.status = "error";
        state.success = false;
        state.error = true;
      }
      state.message = action.payload.message;
    });
    builder.addCase(addTodo.rejected, (state) => {
      state.error = true;
      state.message = "An error has occurred";
      throw new Error(state.message);
    });




    
    //delete todo
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      console.log("delete.fullfilled:", action);
    });

    //update todo
    // There should be 3 state for each addCase
    builder.addCase(updateTodo.pending, (state, action) => {
      state.isLoading = true;
      console.log("addPending_Update:", action);
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      console.log("updateTodo.fulfilled:", action.payload);
      state.isLoading = false;
      const updatedTodoIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );

      if (updatedTodoIndex > -1) {
        state.data[updatedTodoIndex] = action.payload;
      }
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      console.log("addreject_Update:", action);
    });
  },
});
export const { resetState } = todoSlice.actions;
export default todoSlice.reducer;
