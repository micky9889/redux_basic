// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../redux/todoSlicer";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data,
    success,
    isLoading,
    error,
    message: todoMessage,
  } = useSelector((state) => state.todo);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   if (!isLoading && !error) {
  //     Swal.fire({
  //       icon: "success",
  //       // title: `${result.payload.message}.!`,
  //       title: `${message}.!`,
  //       showConfirmButton: false,
  //       timer: 1500,
  //     }).then(() => {
  //       navigate("/");
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       // title: `${result.payload.message}.!`,
  //       title: `${message}.!`,
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     // .then(() => {
  //     // navigate("/");
  //     // });
  //   }
  // }, [error, message, isLoading, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const result = await dispatch(addTodo(formData));
    // console.log(result)
    dispatch(addTodo(formData));
    if (success) {
      Swal.fire({
        icon: "success",
        // title: `${result.payload.message}.!`,
        title: `${todoMessage}.!`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        // title: `${result.payload.message}.!`,
        title: `${todoMessage}.!`,
        showConfirmButton: false,
        timer: 1500,
      });
      // .then(() => {
      // navigate("/");
      // });
    }
  };
  const home = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      {/* {message && <p>{message}</p>} */}
      <Button onClick={home}>back home</Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography variant="h5">ADD USER</Typography>
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
          <TextField
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
          />
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

export default Create;
