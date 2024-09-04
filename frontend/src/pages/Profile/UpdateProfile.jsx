import { useState } from "react";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";

const UpdateProfile = ({ userProfile, updateUserProfile, refetch }) => {
  const [formData, setFormData] = useState({
    name: userProfile.user.name,
    email: userProfile.user.email,
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await updateUserProfile(formData).unwrap();
        refetch()
      setSnackbarMessage("Profile updated successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage("Error updating profile!");
      setSnackbarSeverity("error", error);
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="New Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        type="password"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Update Profile
      </Button>
    </Box>
  );
};

UpdateProfile.propTypes = {
  userProfile: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default UpdateProfile;
