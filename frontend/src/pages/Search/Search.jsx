import { useState } from "react";
import { useSearchBooksQuery } from "../../slices/bookApiSlice";
import { Container } from "@mui/material";
import Book from "../../components/Book/Book";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: books,
    error,
    isLoading,
  } = useSearchBooksQuery(searchTerm, {
    skip: searchTerm.length === 0, // Don't query when search term is empty
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="my-3"
          placeholder="Search by title or author"
        />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {books?.length > 0 ? (
          <Grid container spacing={2}>
            {books.map((book) => (
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
        ) : (
          !isLoading && <p>No books found</p>
        )}
      </div>
    </Container>
  );
};

export default SearchBooks;
