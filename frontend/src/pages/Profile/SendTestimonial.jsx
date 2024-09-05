import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useCreateTestimonialMutation } from "../../slices/testimonialApiSlice";

const SendTestimonial = () => {
  const [message, setMessage] = useState("");
  const [createTestimonial, { isLoading, isSuccess, isError, error }] =
    useCreateTestimonialMutation();

  const userInfo = useSelector((state) => state.auth.userInfo);
    const userId = userInfo.user._id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createTestimonial({ userId, message }).unwrap();
      setMessage("");
    } catch (error) {
      console.error("Failed to submit testimonial", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}
    >
      <Typography variant="h6" gutterBottom>
        Share Your Experience
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Your Testimonial"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
      {isSuccess && (
        <Typography color="success.main">
          Testimonial submitted successfully!
        </Typography>
      )}
      {isError && (
        <Typography color="error.main">
          Failed to submit testimonial: {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default SendTestimonial;
