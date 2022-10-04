import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Center,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

import { useState, useContext } from "react";
import {
  loginFailureAction,
  loginSuccessAction,
  loginLoadingAction
} from "../Context/AuthContext/action";
import { AuthContext } from "../Context/AuthContext/AuthContextProvider";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Home from "./Home";

//  axios used for making network requests;
//  network request (POST)  made to api endpoint `https://reqres.in/api/login` with email and password details;

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleLogin = () => {
    // dispatch(loginLoadingAction())
    axios({
      method: "POST",
      url: `https://reqres.in/api/login`,
      data: loginDetails,
    })
      .then((res) => {
        console.log();
        dispatch(loginSuccessAction(res.data.token));
      })
      .catch(() => {
        dispatch(loginFailureAction());
      });
  };

  if (state.isAuth) {
    // dispatch(loginSuccessAction(res.data.token))
    return <Navigate to="/" />;
  }

  if (state.isError) {
    return (
      <Container
        width={{
          base: "full",
          sm: "full",
          md: "container.xl",
          lg: "container.lg",
        }}
        centerContent={true}
      >
        <Alert
          status="error"
          py={{ base: 4, sm: 4, md: 4, lg: 6 }}
          my={{ base: 24, sm: 24, md: 28, lg: 40 }}
          px={{ base: 1, sm: 4, md: 4, lg: 6 }}
        >
          <AlertIcon />
          <AlertDescription>
            Something went wrong,PLease Refresh.
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  const { email, password } = loginDetails;

  return (
    <Container
      width={{
        base: "full",
        sm: "full",
        md: "container.xl",
        lg: "container.lg",
      }}
      centerContent={true}
    >
      <VStack
        width="full"
        boxShadow="lg"
        py={{ base: 4, sm: 4, md: 4, lg: 6 }}
        my={{ base: 24, sm: 24, md: 28, lg: 40 }}
        px={{ base: 2, sm: 2, md: 4, lg: 6 }}
      >
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <Center>
            <Button
              variant="outline"
              colorScheme="gray"
              mt={4}
              onClick={handleLogin}
              isLoading={state.isLoading}
            >
              LOGIN
            </Button>
          </Center>
        </FormControl>
      </VStack>
    </Container>
  );
};

export default Login;
