import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import {
  useRemoveItemFromCartMutation,
  useClearCartMutation,
} from "../../slices/cartApiSlice";
import {
  removeItemFromCart,
  clearCart,
  setTotalCartItems,
} from "../../redux/cart";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [removeItemFromCartApi] = useRemoveItemFromCartMutation();
  const [clearCartApi] = useClearCartMutation();

  // State for dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleOpenDialog = (type, bookId) => {
    setDialogType(type);
    setSelectedBookId(bookId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBookId(null);
  };

  const handleConfirmAction = async () => {
    try {
      if (dialogType === "remove" && selectedBookId) {
        await removeItemFromCartApi({ bookId: selectedBookId }).unwrap();
        dispatch(removeItemFromCart({ bookId: selectedBookId }));
      } else if (dialogType === "clear") {
        await clearCartApi().unwrap();
        dispatch(clearCart());
      }
    } catch (error) {
      console.error(`Failed to ${dialogType} cart:`, error);
    }
    handleCloseDialog();
  };

  useEffect(() => {
    // Check if the cart is empty and set quantity and price accordingly
    const totalQuantity =
      cartItems.length > 0
        ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
        : 0;

    const totalPrice =
      cartItems.length > 0
        ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        : 0;

    // Dispatch updated total quantity and price
    dispatch(setTotalCartItems({ totalQuantity, totalPrice }));
  }, [cartItems, dispatch]);


  const handleProceedToShipping = () => {
    navigate("/shipping"); // Update this path based on your routing setup
  };

  if (cartItems.length === 0) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty
        </Typography>
      </Container>
    );
  }

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.book.price * item.quantity,
    0
  );

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>
          <Grid container spacing={4}>
            {cartItems.map((item) => (
              <Grid item xs={12} md={6} key={item.book._id}>
                <Card>
                  <CardMedia
                    component="img"
                    image={item.book.coverImage}
                    alt={item.book.title}
                    sx={{ height: 200 }}
                  />
                  <CardContent>
                    <Typography variant="h5">{item.book.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Author: {item.book.author}
                    </Typography>
                    <Typography variant="body1">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${item.book.price * item.quantity}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          handleOpenDialog("remove", item.book._id)
                        }
                      >
                        Remove from Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Cart Summary
            </Typography>
            <Typography variant="body1">
              Total Items:{" "}
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </Typography>
            <Typography variant="h6" color="primary">
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleProceedToShipping}
              >
                Proceed to Shipping
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            {dialogType === "clear"
              ? "Are you sure you want to clear your cart?"
              : "Are you sure you want to remove this item from your cart?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;
