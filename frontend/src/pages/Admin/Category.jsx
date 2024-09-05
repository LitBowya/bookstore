import { useState, useEffect } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../slices/categoryApiSlice";

const Category = () => {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetAllCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [categoryData, setCategoryData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (selectedCategory) {
      setCategoryData({
        title: selectedCategory.title || "",
        description: selectedCategory.description || "",
      });
    } else {
      setCategoryData({ title: "", description: "" });
    }
  }, [selectedCategory]);

  const handleAddCategory = async () => {
    try {
      await addCategory(categoryData);
      setOpenDialog(false);
      refetch();
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await updateCategory({ id: selectedCategory._id, data: categoryData });
      setOpenDialog(false);
      refetch();
    } catch (err) {
      console.error("Failed to update category", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(selectedCategory._id);
      setOpenDialog(false);
      refetch();
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  const handleOpenDialog = (category, type) => {
    setSelectedCategory(category);
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <Container>
      <Card className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Categories</h4>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog(null, "add")}
            style={{ marginBottom: "20px" }}
          >
            Add Category
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenDialog(category, "edit")}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenDialog(category, "delete")}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Category Form Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>
            {dialogType === "delete"
              ? "Delete Category"
              : dialogType === "add"
              ? "Add Category"
              : "Edit Category"}
          </DialogTitle>
          <DialogContent>
            {dialogType === "delete" ? (
              <DialogContentText>
                Are you sure you want to delete {selectedCategory?.title}?
              </DialogContentText>
            ) : (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={categoryData.name}
                  onChange={handleCategoryChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled={dialogType === "delete"}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={categoryData.description}
                  onChange={handleCategoryChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled={dialogType === "delete"}
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
                  ? handleAddCategory
                  : handleUpdateCategory
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

export default Category;
