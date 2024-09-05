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
import { useGetAllCategoriesQuery } from "../../slices/categoryApiSlice";
import styles from "./ShopPage.module.css";
import PropTypes from "prop-types";

const getRandomColor = () => {
  // Generate a random hex color
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const hexToRgba = (hex, alpha = 0.5) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getTextColor = (backgroundColor) => {
  backgroundColor = backgroundColor.replace("#", "");
  const r = parseInt(backgroundColor.substr(0, 2), 16);
  const g = parseInt(backgroundColor.substr(2, 2), 16);
  const b = parseInt(backgroundColor.substr(4, 2), 16);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 128 ? "#FFFFFF" : "#000000";
};

const HeroSection = ({ categoryName }) => {
  const backgroundColor = getRandomColor();
  const rgbaBackgroundColor = hexToRgba(backgroundColor, 0.5); // Set opacity here
  const textColor = getTextColor(backgroundColor);

  return (
    <Box
      sx={{
        width: "100%",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: rgbaBackgroundColor,
        color: textColor,
      }}
      className={styles.heroSection}
    >
      <Typography variant="h3">{categoryName}</Typography>
    </Box>
  );
};

const ShopPage = () => {
  const { categoryId } = useParams(); // Get the category ID from the URL
  const {
    data: books,
    isLoading: booksLoading,
    error: booksError,
  } = useGetAllBooksQuery(categoryId === "all" || "" ? "" : categoryId);

  // Fetch categories
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (booksLoading || categoriesLoading) return <CircularProgress />;
  if (booksError)
    return (
      <Typography variant="h6" color="error">
        Error loading books.
      </Typography>
    );
  if (categoriesError)
    return (
      <Typography variant="h6" color="error">
        Error loading categories.
      </Typography>
    );

  // Map category ID to name
  const categoryMap = categories.reduce((acc, category) => {
    acc[category._id] = category.name;
    return acc;
  }, {});

  const currentCategoryName =
    categoryMap[categoryId] ||
    (categoryId === "all" ? "All Books" : categoryId);

  return (
    <Box sx={{ padding: "2rem" }}>
      <HeroSection categoryName={currentCategoryName} />
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        {categoryId === "all" ? "All Books" : `Books in ${currentCategoryName}`}
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
    </Box>
  );
};

HeroSection.propTypes = {
  categoryName: PropTypes.string.isRequired,
};


export default ShopPage;
