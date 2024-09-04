import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Container,
} from "@mui/material";
import { useGetRandomTestimonialsQuery } from "../../slices/testimonialApiSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const TestimonialsCarousel = () => {
  const { data, isLoading, error } = useGetRandomTestimonialsQuery();
    const [currentIndex, setCurrentIndex] = useState(0);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % (data?.testimonials.length || 1)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [data?.testimonials.length]);

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography variant="h6" color="error">
        Error loading testimonials.
      </Typography>
    );

    const testimonials = data?.testimonials || [];
    const profilePicture = `${backendUrl}${testimonials[currentIndex].user.profilePicture}`;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <Container>
      <Box sx={{ padding: "2rem", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          What Our Users Say
        </Typography>
        <Box sx={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <AnimatePresence>
            {testimonials.length > 0 && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{ maxWidth: "100%" }}>
                  <CardContent>
                    <img
                      src={profilePicture}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />

                    <Typography variant="h6">
                      {testimonials[currentIndex].user.name}
                    </Typography>
                    <Typography variant="body1">
                      {testimonials[currentIndex].message}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              transform: "translateY(-50%)",
            }}
            onClick={handlePrev}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              transform: "translateY(-50%)",
            }}
            onClick={handleNext}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default TestimonialsCarousel;
