// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoById, updateTodo } from "../redux/todoSlicer";

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { todoDetail } = useSelector((state) => state.todo);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
  });

  // const fetchData = () => {
  //   // const todoData = await dispatch(fetchTodoById(id));
  //   dispatch(fetchTodoById(id));
  //   // const dataById = todoData.payload.user;
  //   // console.log("mick:", dataById);
  //   setFormData({
  //     fname: todoDetail?.fname,
  //     lname: todoDetail?.lname,
  //     username: todoDetail?.username,
  //     password: todoDetail?.password || "",
  //     email: todoDetail?.email || "",
  //     avatar: todoDetail?.avatar,
  //   });
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(fetchTodoById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (todoDetail && todoDetail !== undefined) {
      setFormData({
        fname: todoDetail?.fname,
        lname: todoDetail?.lname,
        username: todoDetail?.username,
        password: todoDetail?.password || "",
        email: todoDetail?.email || "",
        avatar: todoDetail?.avatar,
      });
    }
  }, [todoDetail]);

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
