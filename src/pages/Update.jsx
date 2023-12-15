// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoById, updateTodo } from "../redux/todoSlicer";

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  //   const todo = useSelector((state) => state.todo.data.find((x) => x.id == id));
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
  });
  useEffect(() => {
    fetchData();
  }, [dispatch, id]);

  const fetchData = async () => {
    const todoData = await dispatch(fetchTodoById(id));
    const dataById = todoData.payload.user;
    console.log("mick:", dataById);
    setFormData({
      fname: dataById.fname,
      lname: dataById.lname,
      username: dataById.username,
      password: dataById.password || "",
      email: dataById.email || "",
      avatar: dataById.avatar,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataWithId = {
      ...formData,
      id: id,
    };
    dispatch(updateTodo(formDataWithId));
    navigate("/");
  };
  const home = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Button onClick={home}>back home</Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography variant="h5">UPDATE USER</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="outlined"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="User Name"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          {/* <TextField
            label="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            fullWidth
          /> */}
          <TextField
            label="Avatar"
            variant="outlined"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Update;
