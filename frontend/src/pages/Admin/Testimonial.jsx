import { useState } from "react";
import {
  useGetAllTestimonialsQuery,
  useDeleteTestimonialMutation,
} from "../../slices/testimonialApiSlice";
import {
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Testimonial = () => {
  const {
    data: testimonials,
    isLoading,
    error,
    refetch,
  } = useGetAllTestimonialsQuery();
  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const [openDialog, setOpenDialog] = useState(false);
    const [selectedTestimonialId, setSelectedTestimonialId] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleOpenDialog = (id) => {
    setSelectedTestimonialId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTestimonialId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedTestimonialId) {
        await deleteTestimonial(selectedTestimonialId).unwrap();
        refetch();
        // Optionally, refetch or update the state after successful deletion
      }
    } catch (err) {
      console.error("Failed to delete the testimonial: ", err);
    }
    handleCloseDialog();
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading testimonials</div>;
  if (testimonials.length === 0)
    return <Container>No testimonials found</Container>;

  return (
    <Container>
      <Card className="p-3">
        <h4>Testimonials</h4>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testimonials &&
                testimonials.testimonials.map((testimonial) => (
                  <TableRow key={testimonial._id}>
                    <TableCell className="d-flex align-items-center gap-2">
                      <img
                        src={`${backendUrl}${testimonial.user?.profilePicture}`}
                        alt="profilePicture"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                }}

                      />
                      {testimonial.user?.name || "N/A"}
                    </TableCell>
                    <TableCell>{testimonial.message}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenDialog(testimonial._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography id="confirmation-dialog-description">
            Are you sure you want to delete this testimonial?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Testimonial;
