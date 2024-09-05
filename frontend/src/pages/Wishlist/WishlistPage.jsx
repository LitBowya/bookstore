import { useState } from "react";
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
} from "@mui/material";
import {
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} from "../../slices/wishlistApiSlice";
import { removeBookFromWishlist, clearWishlist } from "../../redux/wishlist";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistBooks = useSelector((state) => state.wishlist.books);
  const [removeFromWishlistApi] = useRemoveFromWishlistMutation();
  const [clearWishlistApi] = useClearWishlistMutation();

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
        await removeFromWishlistApi({ bookId: selectedBookId }).unwrap();
        dispatch(removeBookFromWishlist({ bookId: selectedBookId }));
      } else if (dialogType === "clear") {
        await clearWishlistApi().unwrap();
        dispatch(clearWishlist());
      }
    } catch (error) {
      console.error(`Failed to ${dialogType} wishlist:`, error);
    }
    handleCloseDialog();
    };

    const backendUrl = import.meta.env.VITE_BACKEND_URL

  if (wishlistBooks.length === 0) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Your Wishlist is Empty
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      <Grid container spacing={4}>
        {wishlistBooks.map((book) => (
          <Grid item xs={12} md={6} key={book._id}>
            <Card>
              <CardMedia
                component="img"
                image={`${backendUrl}${book.coverImage}`}
                alt={book.title}
                sx={{ height: 200 }}
              />
              <CardContent>
                <Typography variant="h5">{book.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="h6" color="primary">
                  GHS {book.price}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenDialog("remove", book._id)}
                  >
                    Remove from Wishlist
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleOpenDialog("clear")}
        >
          Clear Wishlist
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            {dialogType === "clear"
              ? "Are you sure you want to clear your wishlist?"
              : "Are you sure you want to remove this book from your wishlist?"}
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

export default WishlistPage;
