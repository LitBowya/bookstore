
import PropTypes from "prop-types";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const Book = ({ book }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={`${backendUrl}${book.coverImage}`}
        alt={book.title}
      />
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {book.author}
        </Typography>
        <Typography variant="body1">GHS {book.price}</Typography>
      </CardContent>
    </Card>
  );
};

// PropTypes validation
Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;
