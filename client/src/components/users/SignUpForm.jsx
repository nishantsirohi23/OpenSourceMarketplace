import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../context/UserProvider";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../utils/toastHelper";
import { uploadImage } from "../../utils/imageHelper";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

const SignUpForm = () => {
  const { registerUser } = UserState();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePicture = async (image) => {
    setLoading(true);
    if (image === undefined) {
      toastWarning("Please select an image!");
      return;
    }
    if (image.type === "image/jpeg" || image.type === "image/png") {
      const url = await uploadImage(image);
      setPic(url);
      setLoading(false);
    } else {
      toastWarning("Please select an image!");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmPassword || !type) {
      toastWarning("Please fill all the fields!");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toastWarning("Passwords do not match!");
      setLoading(false);
      return;
    }
    console.log("type from signupform", type);
    const data = await registerUser(name, email, password, pic, type, username);
    if (data) {
      navigate("/");
      console.log("Signup done");
      toastSuccess("Account creation was successful.");
      clearInputs();
      setLoading(false);
      window.location.reload();

    } else {
      toastError("Account creation has failed!");
      setLoading(false);
    }
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPic("");
    setType("");
    setUsername("");
  };

  return (
    <Box maxW="400px" w="full" mx="auto" rounded="lg" p={8} px={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        SIGN UP
      </Text>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            borderColor="#C0C0C0"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="type">Type</FormLabel>
          <Input
            id="type"
            type="text"
            placeholder="Type"
            autoComplete="type"
            onChange={(e) => setType(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="uploadPhoto">Upload Your Photo</FormLabel>
          <Input
            id="uploadPhoto"
            type="file"
            accept="image/*"
            onChange={(e) => handlePicture(e.target.files[0])}
          />
        </FormControl>

        <Button
          colorScheme="teal"
          isLoading={loading}
          loadingText="Signing up..."
          onClick={(e) => handleSubmit(e)}
        >
          SIGN UP
        </Button>
      </Stack>
    </Box>
  );
};

export default SignUpForm;
