import { useState } from "react";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetAllBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "../../slices/bookApiSlice";
import { useGetAllCategoriesQuery } from "../../slices/categoryApiSlice";

const Books = () => {
  const { data: books, isLoading, error, refetch } = useGetAllBooksQuery();
  const { data: categories } = useGetAllCategoriesQuery();
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    coverImage: null,
    bookPdf: null,
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleAddBook = async () => {
    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === "coverImage" || key === "bookPdf") {
          if (formData[key]) data.append(key, formData[key]);
        } else {
          data.append(key, formData[key]);
        }
      }
      await addBook(data);
      setOpenDialog(false);
      refetch();
    } catch (err) {
      console.error("Failed to add book", err);
    }
  };

  const handleUpdateBook = async () => {
    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === "coverImage" || key === "bookPdf") {
          if (formData[key]) data.append(key, formData[key]);
        } else {
          data.append(key, formData[key]);
        }
      }
      await updateBook({ id: selectedBook._id, data });
      refetch();
      setOpenDialog(false);
    } catch (err) {
      console.error("Failed to update book", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBook(selectedBook._id);
      setOpenDialog(false);
      refetch();
    } catch (err) {
      console.error("Failed to delete book", err);
    }
  };

  const handleOpenDialog = (book, type) => {
    setSelectedBook(book);
    setDialogType(type);
    setFormData({
      title: book?.title || "",
      author: book?.author || "",
      description: book?.description || "",
      price: book?.price || "",
      category: book?.category._id || "",
      stock: book?.stock || "",
      coverImage: null,
      bookPdf: null,
    });
    setOpenDialog(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const filteredBooks = books?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;

  return (
    <Container>
      <Card className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Books</h4>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog(null, "add")}
            style={{ marginBottom: "20px" }}
          >
            Add Book
          </Button>
        </div>

        <TextField
          label="Search by title or author"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          style={{ marginBottom: "20px" }}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cover Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>
                    <img
                      src={
                        `${backendUrl}${book.coverImage}` ||
                        "/default-cover.png"
                      }
                      alt={book.title}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>GHS {book.price}</TableCell>
                  <TableCell>{book.category.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(book, "edit")}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenDialog(book, "delete")}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Book Form Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>
            {dialogType === "delete"
              ? "Delete Book"
              : dialogType === "add"
              ? "Add Book"
              : "Edit Book"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {dialogType === "delete"
                ? `Are you sure you want to delete ${selectedBook?.title}?`
                : dialogType === "add"
                ? "Please enter the details of the new book."
                : `Are you sure you want to update ${selectedBook?.title}?`}
            </DialogContentText>
            {dialogType !== "delete" && (
              <>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  fullWidth
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  fullWidth
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  fullWidth
                  style={{ marginBottom: "16px" }}
                />
                <FormControl fullWidth style={{ marginBottom: "16px" }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {categories?.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  fullWidth
                  style={{ marginBottom: "16px" }}
                />
                <label>Cover Image</label>
                <input
                  type="file"
                  label="Cover Image"
                  name="coverImage"
                  onChange={handleFileChange}
                  style={{ marginBottom: "16px" }}
                />
                <label>Book Pdf</label>
                <input
                  type="file"
                  label="Book Pdf"
                  name="bookPdf"
                  onChange={handleFileChange}
                  style={{ marginBottom: "16px" }}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              onClick={
                dialogType === "delete"
                  ? handleDelete
                  : dialogType === "add"
                  ? handleAddBook
                  : handleUpdateBook
              }
              color={dialogType === "delete" ? "error" : "primary"}
            >
              {dialogType === "delete"
                ? "Delete"
                : dialogType === "add"
                ? "Add"
                : "Update"}
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Container>
  );
};

export default Books;
