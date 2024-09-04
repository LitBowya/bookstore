import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const staffMembers = [
  {
    name: "John Doe",
    role: "Librarian",
    photo: "path_to_john_photo.jpg",
    bio: "John has been with the library for over 10 years. He specializes in book recommendations and community events.",
    socialLinks: {
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
  },
  {
    name: "Jane Smith",
    role: "Assistant Librarian",
    photo: "path_to_jane_photo.jpg",
    bio: "Jane is passionate about children’s literature and organizing reading programs for kids.",
    socialLinks: {
      facebook: "https://facebook.com/janesmith",
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
  },
  {
    name: "Emily Johnson",
    role: "Library Technician",
    photo: "path_to_emily_photo.jpg",
    bio: "Emily is an expert in digital resources and helps patrons with e-books and online databases.",
    socialLinks: {
      facebook: "https://facebook.com/emilyjohnson",
      twitter: "https://twitter.com/emilyjohnson",
      linkedin: "https://linkedin.com/in/emilyjohnson",
    },
  },
];

const MeetOurStaff = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: "2rem 0" }}>
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Meet Our Staff
        </Typography>
        <Typography variant="body1" align="center">
          Our dedicated team is here to help you find the perfect book, assist
          with research, and make your library experience enjoyable.
        </Typography>
        <Divider sx={{ my: "2rem" }} />
        <Grid container spacing={4}>
          {staffMembers.map((staff, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120, borderRadius: "50%" }}
                  image={staff.photo}
                  alt={staff.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {staff.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {staff.role}
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    {staff.bio}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    {staff.socialLinks.facebook && (
                      <IconButton
                        href={staff.socialLinks.facebook}
                        target="_blank"
                      >
                        <Facebook />
                      </IconButton>
                    )}
                    {staff.socialLinks.twitter && (
                      <IconButton
                        href={staff.socialLinks.twitter}
                        target="_blank"
                      >
                        <Twitter />
                      </IconButton>
                    )}
                    {staff.socialLinks.linkedin && (
                      <IconButton
                        href={staff.socialLinks.linkedin}
                        target="_blank"
                      >
                        <LinkedIn />
                      </IconButton>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MeetOurStaff;
