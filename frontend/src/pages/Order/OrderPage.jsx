import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Paper, Typography, Box, Button } from "@mui/material";
import { useInitiatePaymentMutation } from "../../slices/paymentApiSlice";
import { clearCart } from "../../redux/cart";

const OrderPage = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const shippingDetails = useSelector(
    (state) => state.shipping.shippingDetails
  );
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.book.price * item.quantity,
    0
  );

  const [initiatePayment] = useInitiatePaymentMutation();

  // Calculate total quantity
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handlePayment = async () => {
    try {
      const response = await initiatePayment({
        email: userInfo.user.email,
        orderItems: cartItems.map((item) => ({
          title: item.book.title,
          qty: item.quantity,
          price: item.book.price,
          book: item.book._id,
        })),
        totalPrice: totalPrice,
        shippingAddress: {
          region: shippingDetails.region,
          town: shippingDetails.town,
          city: shippingDetails.city,
          additionalInfo: shippingDetails.additionalInfo,
          street: shippingDetails.street,
        },
        paymentMethod: "Paystack", // Add payment method field
      });

      const url = response.data.data.authorization_url;
      dispatch(clearCart());

      // Redirect to payment authorization URL
      window.location.href = url;
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {/* Left Column: User and Shipping Details */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {userInfo.user?.name || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {userInfo.user?.email || "N/A"}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Shipping Address
            </Typography>
            <Typography variant="body1">
              <strong>Street:</strong> {shippingDetails.street}
            </Typography>
            <Typography variant="body1">
              <strong>Town:</strong> {shippingDetails.town}
            </Typography>
            <Typography variant="body1">
              <strong>City:</strong> {shippingDetails.city}
            </Typography>
            <Typography variant="body1">
              <strong>Additional Info:</strong> {shippingDetails.additionalInfo}
            </Typography>
            <Typography variant="body1">
              <strong>Region:</strong> {shippingDetails.region}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Cart Items
            </Typography>
            {cartItems.map((item) => (
              <Box
                key={item.book._id}
                sx={{
                  mb: 2,
                  borderBottom: "1px solid #ddd",
                  pb: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={`${backendUrl}${item.book.coverImage}`}
                  alt={item.book.title}
                  style={{
                    width: 100,
                    height: 150,
                    objectFit: "cover",
                    marginRight: 16,
                  }}
                />
                <Box>
                  <Typography variant="body1">
                    <strong>Title:</strong> {item.book.title}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Author:</strong> {item.book.author}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Quantity:</strong> {item.quantity}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Price:</strong> ${item.book.price * item.quantity}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Right Column: Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body1">
              <strong>Total Quantity:</strong> {totalQuantity}
            </Typography>
            <Typography variant="h6" color="primary">
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </Typography>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePayment}
              >
                Pay
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderPage;
