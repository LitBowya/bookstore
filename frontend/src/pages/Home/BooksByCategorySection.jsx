import React from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom"; 
import { useGetAllBooksQuery } from "../../slices/bookApiSlice";
import { useGetAllCategoriesQuery } from "../../slices/categoryApiSlice";
import CategoryTabs from "./CategoryTabs";
import Book from '../../components/Book/Book'
import BookCategoryCss from './BookCategory.module.css'

const BooksByCategorySection = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  // Fetch data
  const { data: allBooks, isLoading: isBooksLoading } = useGetAllBooksQuery(
    selectedCategory === "all" ? undefined : selectedCategory
  );
  const { data: categories, isLoading: isCategoriesLoading } =
        useGetAllCategoriesQuery();

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (isBooksLoading || isCategoriesLoading) return <CircularProgress />;

  const filteredBooks =
    selectedCategory === "all"
      ? allBooks
      : allBooks.filter((book) => book.category._id === selectedCategory);

  return (
    <div className={BookCategoryCss.container}>
      <Container>
        <Box sx={{ mb: "2rem" }}>
          <h4>
            Books by Category
          </h4>
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
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
                    <Book key={book._id} book={book} />
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
              <Typography className="text-end" variant="h6" color="primary">
                see more
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default BooksByCategorySection;
