// src/pages/RegisterPage/RegisterPage.jsx

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid2,
  TextField,
  Typography,
  Alert,
  Link,
  Avatar,
} from "@mui/material";
import { useRegisterMutation } from "../../slices/authApiSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    // Append each part of the address individually
    formData.append("region", region);
    formData.append("city", city);
    formData.append("town", town);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const userData = await register(formData).unwrap();
      console.log(userData);
      setSuccess("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError("Failed to register. Please try again.", err);
    }
  };


  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            p: 3,
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: 2,
          }}
          encType="multipart/form-data"
        >
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} sm={6}>
              <TextField
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <TextField
                label="Region"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <TextField
                label="City"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <TextField
                label="Town"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <TextField
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 2, mb: 2 }}
                fullWidth
              >
                Upload Profile Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </Button>
              {profilePicturePreview && (
                <Avatar
                  src={profilePicturePreview}
                  alt="Profile Preview"
                  sx={{ width: 56, height: 56, mt: 2 }}
                />
              )}
            </Grid2>
          </Grid2>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>

        <Box mt={2}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="/login" underline="hover">
              Log in here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
