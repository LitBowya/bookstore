import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Card,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";

const Users = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser._id);
        setOpenDialog(false);
        refetch()
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const handleAdminChange = async () => {
    try {
      await updateUser({
        id: selectedUser._id,
        data: { isAdmin: !selectedUser.isAdmin }, // Toggle the isAdmin value
      });
        setOpenDialog(false);
        refetch();
    } catch (err) {
      console.error("Failed to update user admin status", err);
    }
  };

  const handleOpenDialog = (user, type) => {
    setSelectedUser(user);
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users?.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <Container>
      <Card className="p-3">
        <h4>Users</h4>
        <TextField
          label="Search by name or email"
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
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Make Admin</TableCell>
                <TableCell>Delete User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <img
                      src={
                        `${backendUrl}${user.profilePicture}` ||
                        "/default-avatar.png"
                      }
                      alt="user"
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={user.isAdmin}
                      onChange={() => handleOpenDialog(user, "admin")}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenDialog(user, "delete")}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>
            {dialogType === "delete" ? "Delete User" : "Change Admin Status"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {dialogType === "delete"
                ? `Are you sure you want to delete ${selectedUser?.name}?`
                : `Are you sure you want to ${
                    selectedUser?.isAdmin ? "remove" : "make"
                  } ${selectedUser?.name} as admin?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              onClick={
                dialogType === "delete" ? handleDelete : handleAdminChange
              }
              color={dialogType === "delete" ? "error" : "primary"}
            >
              {dialogType === "delete" ? "Delete" : "Confirm"}
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Container>
  );
};

export default Users;
