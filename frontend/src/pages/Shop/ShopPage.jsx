import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useGetAllBooksQuery } from "../../slices/bookApiSlice";

const ShopPage = () => {
  const { categoryId } = useParams(); // Get the category ID from the URL
  const {
    data: books,
    isLoading,
    error,
  } = useGetAllBooksQuery(categoryId === "all" || "" ? "" : categoryId);

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography variant="h6" color="error">
        Error loading books.
      </Typography>
    );

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        {categoryId === "all" ? "All Books" : `Books in Category ${categoryId}`}
      </Typography>
      {books.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No books available for this category.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={book._id}>
              <Link
                to={`/books/${book._id}`}
                style={{ textDecoration: "none" }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={book.coverImage}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {book.author}
                    </Typography>
                    <Typography variant="body1">${book.price}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ShopPage;
