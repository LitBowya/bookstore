import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #ff7e5f, #feb47b)",
        color: "#fff",
        padding: "4rem 2rem",
        textAlign: "center",
        borderRadius: "8px",
        mb: "2rem",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Our Bookstore
      </Typography>
      <Typography variant="h5" gutterBottom>
        Explore the latest books and more
      </Typography>
      <Link to="/shop" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" size="large">
          Shop Now
        </Button>
      </Link>
    </Box>
  );
};

export default HeroSection;
