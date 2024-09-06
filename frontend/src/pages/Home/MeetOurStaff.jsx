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
import MeetStaffCss from './MeetStaff.module.css'

const staffMembers = [
  {
    name: "Kofi Amoako",
    role: "Librarian",
    photo: "/images/MeetStaff/kofi.jpg",
    bio: "Kofi has been with the library for over 10 years. He specializes in book recommendations and community events.",
    socialLinks: {
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
  },
  {
    name: "Isaac Frimpong",
    role: "Assistant Librarian",
    photo: "/images/MeetStaff/isaac.jpg",
    bio: "Isaac is passionate about children’s literature and organizing reading programs for kids.",
    socialLinks: {
      facebook: "https://facebook.com/janesmith",
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
  },
  {
    name: "Alice Mensah",
    role: "Library Technician",
    photo: "/images/MeetStaff/alice.jpg",
    bio: "Alice is an expert in digital resources and helps patrons with e-books and online databases.",
    socialLinks: {
      facebook: "https://facebook.com/emilyjohnson",
      twitter: "https://twitter.com/emilyjohnson",
      linkedin: "https://linkedin.com/in/emilyjohnson",
    },
  },
];

const MeetOurStaff = () => {
  return (
    <div className={MeetStaffCss.container}>
      <Container>
        <h4>Meet Our Staff</h4>
        <Typography variant="body1" align="center">
          Our dedicated team is here to help you find the perfect book, assist
          with research, and make your library experience enjoyable.
        </Typography>
        <div className="d-flex justify-content-center">
          <hr />
        </div>
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
                  sx={{ width: 200, height: 200, borderRadius: "50%" }}
                  image={staff.photo}
                          alt={staff.name}
                          className="my-2"
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
    </div>
  );
};

export default MeetOurStaff;
