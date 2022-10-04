import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { checkout, removeFromCart } from "../Context/CartContext/action";
import { CartContext } from "../Context/CartContext/CartContextProvider";

// 1. cart page should contain all the cart items that are saved in cart context in the form of a table; ( you can display atleast product name and product price in first two cells of any row). the third cell contains remove from cart button clicking on which shall remove the item from the cart ( hint:  you need to dispatch remove from cart action and update your cart )

// 2. Below all the cart items list on table foot; there should be a Total in first cell of row and Total (Total price of all items in cart ) in second cell;

// 3. below the table; there should be a button called `Place Order` clicking on which will open an alert dialog box which asks `Are you sure you want to place this order ?` and two buttons Cancel and Yes; clicking on cancel will close the alert dialog; click on yes will dispatch checkout action which will empty all the cart items in cart context;

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleCheckout = () => {
    dispatch(checkout());
    onclose();
  };

  return (
    <Box>
      <TableContainer mt={{ base: 20, sm: 20, md: 20, lg: 32 }}>
        <Table
          variant="simple"
          colorScheme="gray"
          size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
        >
          <TableCaption>Np Exchange | No Refunds</TableCaption>
          <Thead>
            <Tr>
              <Th fontSize={{ base: "xs", md: "md" }}>Products</Th>
              <Th fontSize={{ base: "xs", md: "md" }}>Price (INR)</Th>
              <Th fontSize={{ base: "xs", md: "md" }}> Remove From Cart</Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.map((cartItem) => (
              <Tr key={cartItem.id}>
                <Td fontSize={{ base: "xs", md: "md" }}>{cartItem.title}</Td>
                <Td fontSize={{ base: "xs", md: "md" }}>{cartItem.price}</Td>
                <Td fontSize={{ base: "xs", md: "md" }}>
                  <Button onClick={() => dispatch(removeFromCart(cartItem.id))}>
                    {cartItem.id}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th fontSize={{ base: "xs", md: "md" }}>Final Price</Th>
              <Th fontSize={{ base: "xs", md: "md" }}>
                {Math.round(state.reduce((a, c) => a + c.price, 0))}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Center mt={{ base: 4, md: 8 }}>
        <Button variant="outline" colorScheme="gray" onClick={onOpen}>
          Place Order
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Place Order
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to place this order?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  {" "}
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleCheckout} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Center>
    </Box>
  );
};

export default Cart;
