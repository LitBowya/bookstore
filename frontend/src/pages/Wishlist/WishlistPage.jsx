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
import { IoHeartDislike } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} from "../../slices/wishlistApiSlice";
import { removeBookFromWishlist, clearWishlist } from "../../redux/wishlist";
import WishlistCss from "./WIshlist.module.css";

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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (wishlistBooks.length === 0) {
    return (
      <Container>
        <h4 className="text-center fw-bold my-3 d-flex flex-column justify-content-center align-items-center">
          Your Wishlist is Empty
          <IoHeartDislike size={50}/>
        </h4>
      </Container>
    );
  }

  return (
    <Container>
      <h4 className="fw-bold my-3">Your Wishlist</h4>
      <Grid container spacing={4}>
        {wishlistBooks.map((book) => (
          <Grid item xs={12} key={book._id}>
            <Card className={WishlistCss.card}>
              <CardMedia
                component="img"
                image={`${backendUrl}${book.coverImage}`}
                alt={book.title}
                className={WishlistCss.img}
              />
              <CardContent className={WishlistCss.cardInfo}>
                <p className={WishlistCss.title}>{book.title}</p>
                <p className={WishlistCss.author}>{book.author}</p>
              </CardContent>
              <CardContent>
                <div>
                  <h6>GHS {book.price}</h6>
                </div>
              </CardContent>
              <Button
                variant="contained"
                onClick={() => handleOpenDialog("remove", book._id)}
                className={WishlistCss.btn}
              >
                <MdDelete size={30} />
              </Button>
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
          <Button onClick={handleConfirmAction} className="text-danger">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WishlistPage;
