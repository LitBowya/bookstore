import { useState } from "react";
import { AppBar, Tabs, Tab, Box, Typography, Container } from "@mui/material";
import PropTypes from "prop-types";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../slices/userApiSlice";
import { useGetUserOrdersQuery } from "../../slices/orderApiSlice";
import UserProfile from "./UserProfile";
import UpdateProfile from "./UpdateProfile";
import UserOrders from "./UserOrders";
import SendTestimonial from "./SendTestimonial";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Fetch data using your RTK queries
  const { data: userProfile, isLoading: isProfileLoading } =
    useGetUserProfileQuery();
  const {
    data: userOrders,
    isLoading: isOrdersLoading,
    refetch,
  } = useGetUserOrdersQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  return (
    <Container className="mt-4" sx={{ textAlign: "center" }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          backgroundColor: "transparent",
          borderBottom: "1px solid #e0e0e0",
          marginBottom: "20px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="profile tabs"
          centered
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTab-root": {
              backgroundColor: "#f5f5f5",
              color: "#000",
              margin: "0 5px",
              borderRadius: "5px 5px 0 0",
            },
            "& .Mui-selected": {
              backgroundColor: "#3f51b5",
              color: "#fff",
            },
          }}
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Update Profile" {...a11yProps(1)} />
          <Tab label="My Orders" {...a11yProps(2)} />
          <Tab label="Send Testimonial" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} sx={{ textAlign: "left" }}>
        <UserProfile userProfile={userProfile} isLoading={isProfileLoading} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpdateProfile
          userProfile={userProfile}
          updateUserProfile={updateUserProfile}
          refetch={refetch}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserOrders userOrders={userOrders} isLoading={isOrdersLoading} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SendTestimonial />
      </TabPanel>
    </Container>
  );
};

export default ProfilePage;
