// src/components/Homepage/LatestBooksSection.js


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
import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../../slices/bookApiSlice";

const LatestBooksSection = () => {
  const { data: allBooks, isLoading } = useGetAllBooksQuery();
  const latestBooks = allBooks?.slice(0, 4) || [];

  if (isLoading) return <CircularProgress />;

  return (
    <Container>
      <Box sx={{ mb: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Latest Books
        </Typography>
        <Grid container spacing={2}>
          {latestBooks.map((book) => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={book._id}>
                  <Link
                to={`/books/${book._id}`}
                style={{ textDecoration: "none" }}
              ><Card>
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
              </Card></Link>

            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default LatestBooksSection;
