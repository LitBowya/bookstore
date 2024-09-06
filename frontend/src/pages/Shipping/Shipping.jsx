import { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { setShippingDetails } from "../../redux/shipping";
import { useNavigate } from "react-router-dom";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetailsState] = useState({
    street: "",
    town: "",
    city: "",
    additionalInfo: "",
    region: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetailsState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setShippingDetails(shippingDetails));
    // Clear the form fields
    setShippingDetailsState({
      street: "",
      town: "",
      city: "",
      additionalInfo: "",
      region: "",
    });
    navigate("/order");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          padding: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: "#fff",
        }}
      >
        <h4 className="text-center">
          Shipping Details
        </h4>
        <TextField
          fullWidth
          margin="normal"
          label="Street"
          name="street"
          value={shippingDetails.street}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Town"
          name="town"
          value={shippingDetails.town}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="City"
          name="city"
          value={shippingDetails.city}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Additional Information"
          name="additionalInfo"
          value={shippingDetails.additionalInfo}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Region"
          name="region"
          value={shippingDetails.region}
          onChange={handleChange}
          required
        />
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary">
            Save Shipping Details
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ShippingPage;
