import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#000", padding: "2rem 0", mt: "auto" }}>
      <Container>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff" }}>
              123 Bookstore Ave,
              <br />
              Book City, BK 12345
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff" }}>
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff" }}>
              Email:{" "}
              <Link href="mailto:info@bookstore.com" color="inherit">
                info@bookstore.com
              </Link>
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Quick Links
            </Typography>
            <Link href="#" underline="none" color="inherit">
              <Typography variant="body1" sx={{ color: "#fff" }}>
                About Us
              </Typography>
            </Link>
            <Link href="#" underline="none" color="inherit">
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Contact Us
              </Typography>
            </Link>
            <Link href="#" underline="none" color="inherit">
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Privacy Policy
              </Typography>
            </Link>
            <Link href="#" underline="none" color="inherit">
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Terms of Service
              </Typography>
            </Link>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <IconButton href="https://facebook.com" target="_blank">
                <Facebook sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank">
                <Twitter sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank">
                <Instagram sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank">
                <LinkedIn sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: "#222", py: "1rem", mt: "2rem" }}>
        <Container>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ color: "#fff" }}
          >
            © {new Date().getFullYear()} Bookstore. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
