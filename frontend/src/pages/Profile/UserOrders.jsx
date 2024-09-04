
import { CircularProgress, Box, Typography, Alert } from "@mui/material";
import PropTypes from "prop-types";

const UserOrders = ({ userOrders, isLoading }) => {
  if (isLoading) return <CircularProgress />;

  return (
    <Box>
      {userOrders.orders.length === 0 ? (
        <Alert>You have no orders</Alert>
      ) : (
        userOrders.orders.map((order) => (
          <Box key={order._id} mb={2}>
            <Typography variant="h6">Order ID: {order._id}</Typography>
            <Typography variant="body1">
              Total Price: ${order.totalPrice}
            </Typography>
            <Typography variant="body1">
              Payment Method: {order.paymentMethod}
            </Typography>
            {order.orderItems.map((item) => (
              <Box key={item.book._id} ml={2}>
                <Typography variant="body2">
                  Title: {item.book.title}
                </Typography>
                <Typography variant="body2">
                  Author: {item.book.author}
                </Typography>
                <Typography variant="body2">
                  Quantity: {item.quantity}
                </Typography>
              </Box>
            ))}
          </Box>
        ))
      )}
    </Box>
  );
};

UserOrders.propTypes = {
  userOrders: PropTypes.shape({
    orders: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        paymentMethod: PropTypes.string.isRequired,
        orderItems: PropTypes.arrayOf(
          PropTypes.shape({
            book: PropTypes.shape({
              _id: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              author: PropTypes.string.isRequired,
            }).isRequired,
            quantity: PropTypes.number.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default UserOrders;
