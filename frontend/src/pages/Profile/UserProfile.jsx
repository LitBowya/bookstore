import { CircularProgress, Box, Typography } from "@mui/material";
import { getProfilePictureUrl } from "../../utils/profilePicture";
import PropTypes from "prop-types";

const UserProfile = ({ userProfile, isLoading }) => {
  if (!userProfile || !userProfile.user) {
    return (
      <Typography variant="body1">User profile data is unavailable.</Typography>
    );
  }

  const profilePictureUrl = getProfilePictureUrl(
    userProfile.user.profilePicture
  );
  if (isLoading) return <CircularProgress />;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "left",
      }}
    >
      <Box sx={{ mr: 3 }}>
        {/* Profile Picture */}
        <img
          src={profilePictureUrl}
          alt="Profile Picture"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      </Box>
      <Box>
        {/* User Info */}
        <Typography variant="h6">Name: {userProfile.user.name}</Typography>
        <Typography variant="body1">Email: {userProfile.user.email}</Typography>
        <Typography variant="body1">
          Region: {userProfile.user.address?.region}
        </Typography>
        <Typography variant="body1">
          City: {userProfile.user.address.city}
        </Typography>
        <Typography variant="body1">
          Town: {userProfile.user.address.town}
        </Typography>
        <Typography variant="body1">
          Address: {userProfile.user.address.address}
        </Typography>
        <Typography variant="body1">
          Phone: {userProfile.user.address.phoneNumber}
        </Typography>
      </Box>
    </Box>
  );
};

UserProfile.propTypes = {
  userProfile: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
      address: PropTypes.shape({
        region: PropTypes.string,
        city: PropTypes.string,
        town: PropTypes.string,
        address: PropTypes.string,
        phoneNumber: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default UserProfile;
