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
import { MdOutlineRemoveShoppingCart, MdDelete } from "react-icons/md";
import WishlistCss from "../Wishlist/Wishlist.module.css";

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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleProceedToShipping = () => {
    navigate("/shipping"); // Update this path based on your routing setup
  };

  if (cartItems.length === 0) {
    return (
      <Container>
        <h4 className="text-center fw-bold my-3 d-flex flex-column justify-content-center align-items-center">
          Your Cart is Empty
          <MdOutlineRemoveShoppingCart size={50} />
        </h4>
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
          <h4 className="fw-bold my-3">Your Cart</h4>
          <Grid container spacing={4}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.book._id}>
                <Card className={WishlistCss.card}>
                  <CardMedia
                    component="img"
                    image={`${backendUrl}${item.book.coverImage}`}
                    alt={item.book.title}
                    className={WishlistCss.img}
                  />
                  <CardContent className={WishlistCss.cardInfo}>
                    <p className={WishlistCss.title}>{item.book.title}</p>
                    <p className={WishlistCss.author}>{item.book.author}</p>
                  </CardContent>
                  <CardContent>
                    <div>Qty: {item.quantity}</div>
                  </CardContent>
                  <CardContent>
                    <div>
                      <h6>GHS {item.book.price * item.quantity}</h6>
                    </div>
                  </CardContent>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("remove", item.book._id)}
                    className={WishlistCss.btn}
                  >
                    <MdDelete size={30} />
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} className={WishlistCss.cartSummary}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom className="fw-bold fs-5">
              Cart Summary
            </Typography>
            <Typography variant="body1" className={WishlistCss.summaryText}>
              <span>Total Items: </span>
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </Typography>
            <Typography variant="body1" className={WishlistCss.summaryText}>
              <span>Total Price:</span> GHS {totalPrice.toFixed(2)}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleProceedToShipping}
                className="w-100"
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
          <Button onClick={handleConfirmAction} className="text-danger">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;
