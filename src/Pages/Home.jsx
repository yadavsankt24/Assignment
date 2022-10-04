import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { useState,useContext,useEffect,} from "react";
import { CartContext } from "../Context/CartContext/CartContextProvider";
import { addToCart } from "../Context/CartContext/action";
import { loginSuccessAction } from "../Context/AuthContext/action";

//  axios used for making network requests;

//  API request  made to `https://fakestoreapi.com/products` on mount and get the data


const getData = () => {
  return axios.get(`http://fakestoreapi.com/products`);
};

const itemAlreadyExists = (id, cartItems) => {
  if (cartItems.find((item) => item.id === id)) {
    return true;
  }
  return false;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    getData()
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setError(false);
        dispatch(loginSuccessAction(true));
      })
      .catch(() => {
        setError(true);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Stack my={20}>
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    );
  }

  if (error) {
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
          px={{ base: 1, sm: 1, md: 4, lg: 6 }}
        >
          <AlertIcon />
          <AlertDescription>
            Something went wrong,PLease Refresh.
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxW={{ base: "full", md: "container.xl" }}
      p={{ base: 2, lg: 0 }}
    >
      <Grid
        w="full"
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
        gap={4}
      >
        {data &&
          data.map((product) => (
            <GridItem key={product.id}>
              <Box
                bg="gray.50"
                columns={{ sm: 2, md: 4 }}
                spacing="8"
                p={2}
                rounded="lg"
                color="gray.600"
                boxShadow="lg"
              >
                <Grid templateRows="repeat(24,1fr)" h="xl">
                  <GridItem rowSpan={16}>
                    <Flex align="center" justify="center">
                      <Image
                        boxSize="xs"
                        src={product.image}
                        alt="prod-img"
                        w="full"
                        h="sm"
                      />
                    </Flex>
                  </GridItem>
                  <GridItem rowSpan={3}>
                    <Flex align="center" justify="center">
                      <Box>
                        <Text textAlign="center">{product.title}</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                  <GridItem rowSpan={2}>
                    <Flex align="center" justify="center">
                      <Box>
                        <Text>INR: {product.price}</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                  <GridItem rowSpan={3}>
                    <Flex align="center" justify="center">
                      <Button
                        colorScheme="gray"
                        variant="outline"
                        disabled={itemAlreadyExists(product.id, state)}
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add To Cart
                      </Button>
                    </Flex>
                  </GridItem>
                </Grid>
              </Box>
              ;
            </GridItem>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
