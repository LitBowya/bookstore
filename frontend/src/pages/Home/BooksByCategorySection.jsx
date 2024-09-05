import React from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useGetAllBooksQuery } from "../../slices/bookApiSlice";
import { useGetAllCategoriesQuery } from "../../slices/categoryApiSlice";
import CategoryTabs from "./CategoryTabs";

const BooksByCategorySection = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  // Fetch data
  const { data: allBooks, isLoading: isBooksLoading } = useGetAllBooksQuery(
    selectedCategory === "all" ? undefined : selectedCategory
  );
  const { data: categories, isLoading: isCategoriesLoading } =
        useGetAllCategoriesQuery();

    const backendUrl = import.meta.env.VITE_BACKEND_URL

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (isBooksLoading || isCategoriesLoading) return <CircularProgress />;

  const filteredBooks =
    selectedCategory === "all"
      ? allBooks
      : allBooks.filter((book) => book.category._id === selectedCategory);

  return (
    <Container>
      <Box sx={{ mb: "2rem" }}>
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <Typography variant="h4" gutterBottom>
          Books by Category
        </Typography>
        {filteredBooks.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No books available for this category.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={book._id}>
                <Link
                  to={`/books/${book._id}`}
                  style={{ textDecoration: "none" }}
                >
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
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
        <Box sx={{ mt: "2rem" }}>
          <Link
            to={`/shop/${selectedCategory}`}
            style={{ textDecoration: "none" }}
          >
            <Typography variant="h6" color="primary">
              see more
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default BooksByCategorySection;
