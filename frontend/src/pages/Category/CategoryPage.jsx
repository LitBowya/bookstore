
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid2,
  CircularProgress,
  Card,
  CardContent,
    CardMedia,
} from "@mui/material";
import { useGetBookByCategoryQuery } from "../../slices/bookApiSlice";

const CategoryPage = () => {
  const { categoryId } = useParams();

  // Fetch books for the specific category
  const { data: books, isLoading } = useGetBookByCategoryQuery(categoryId);

    if (isLoading) return <CircularProgress />;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <Box sx={{ mb: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Books in This Category
      </Typography>
      {books.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No books available for this category.
        </Typography>
      ) : (
        <Grid2 container spacing={2}>
          {books.map((book) => (
            <Grid2 item xs={12} sm={6} md={3} key={book._id}>
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
                  <Typography variant="body1">${book.price}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default CategoryPage;
