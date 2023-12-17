import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, fetchTodo } from "./redux/todoSlicer";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Todo = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.todo);
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  //delete method
  const deleteItem = async (id) => {
    try {
      dispatch(deleteTodo(id));
      dispatch(fetchTodo());
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <div>
      <Link to="/create">
        <Button variant="outlined">add +</Button>
      </Link>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        data.map((todo) => (
          <div
            key={todo.id}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <p>{todo.id}./</p>
            <p>{todo.fname},</p>
            <p>{todo.lname},</p>
            <p>{todo.username}</p>
            <img src={todo.avatar} width={40} height={40} />
            <Link to={`/update/${todo.id}`}>
              <Button variant="outlined">edit</Button>
            </Link>
            <Button
              color="error"
              variant="outlined"
              onClick={() => deleteItem(todo.id)}
            >
              delete
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Todo;
