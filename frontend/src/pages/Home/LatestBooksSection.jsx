
import {
  Box,
  Grid,
  CircularProgress,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../../slices/bookApiSlice";
import Book from "../../components/Book/Book";
import LatestCss from './LatestBooks.module.css'

const LatestBooksSection = () => {
  const { data: allBooks, isLoading } = useGetAllBooksQuery();
    const latestBooks = allBooks?.slice(0, 4) || [];

  if (isLoading) return <CircularProgress />;

  return (
    <div className={LatestCss.latestBooksContainer}>
      <Container>
        <Box sx={{ mb: "2rem" }}>
          <h4>
            Latest Books
          </h4>
          <Grid container spacing={2}>
            {latestBooks.map((book) => (
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
        </Box>
      </Container>
    </div>
  );
};

export default LatestBooksSection;
