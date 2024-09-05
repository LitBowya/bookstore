import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Button,
  Snackbar,
  Alert,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useGetBookByIdQuery } from "../../slices/bookApiSlice";
import { useAddItemToCartMutation } from "../../slices/cartApiSlice";
import { useAddToWishlistMutation } from "../../slices/wishlistApiSlice";
import { addItemToCart as addItemToCartAction } from "../../redux/cart";
import { addBookToWishlist } from "../../redux/wishlist";

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo.user._id;
  const { data: book, isLoading, error } = useGetBookByIdQuery(bookId);
  const [addItemToCart] = useAddItemToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const backendUrl = import.meta.env.VITE_BACKEND_URL

  const handleAddToCart = async () => {
    try {
      await addItemToCart({
        bookId: book._id,
        quantity,
      }).unwrap();
      dispatch(addItemToCartAction({ book, quantity }));
      setSnackbarMessage("Added to cart successfully!");
      setSnackbarSeverity("success");
    } catch (err) {
      console.error("Add to cart error:", err);
      setSnackbarMessage("Failed to add to cart.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleAddToWishlist = async () => {
    try {
      // Add to wishlist on the server
      const { wishlist } = await addToWishlist({
        bookId: book._id,
        userId,
      }).unwrap();

      // Dispatch the entire book details to the Redux store
      dispatch(
        addBookToWishlist({
          wishlist,
          userId,
        })
      );

      setSnackbarMessage("Added to wishlist successfully!");
      setSnackbarSeverity("success");
    } catch (err) {
      console.error("Add to wishlist error:", err);
      setSnackbarMessage("Failed to add to wishlist.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };



  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography variant="h6" color="error">
        Error loading book details.
      </Typography>
    );

  // Generate quantity options
  const quantityOptions = Array.from({ length: book.stock }, (_, i) => i + 1);

  return (
    <Container>
      <Box sx={{ padding: "2rem" }}>
        <Grid container spacing={4}>
          {/* Book Image */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={`${backendUrl}${book.coverImage}`}
              alt={book.title}
              sx={{ borderRadius: "8px", width: "100%", height: "450px", objectFit: "cover" }}
            />
          </Grid>

          {/* Book Details */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {book.author}
                </Typography>
                <Typography variant="body1" paragraph>
                  {book.description}
                </Typography>
                <Typography variant="h5" color="primary">
                  ${book.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.stock} in stock
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <FormControl
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <InputLabel>Quantity</InputLabel>
                    <Select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      label="Quantity"
                    >
                      {quantityOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    disabled={book.stock === 0}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleAddToWishlist}
                  >
                    Add to Wishlist
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Snackbar for messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default BookDetailsPage;
