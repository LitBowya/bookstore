import {
  CircularProgress,
  Box,
  Typography,
  Alert,
  Grid,
  Card,
} from "@mui/material";
import PropTypes from "prop-types";

const UserOrders = ({ userOrders, isLoading }) => {
  if (isLoading) return <CircularProgress />;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <Box>
      {userOrders.orders.length === 0 ? (
        <Alert>You have no orders</Alert>
      ) : (
        <Grid container spacing={2}>
          {userOrders.orders.map((order) => (
            <Grid item xs={12} md={4} key={order._id}>
              <Card mb={2} p={2}>
                {order.orderItems.map((item) => (
                  <div key={item.book._id}>
                    <img
                      className="w-100"
                      src={`${backendUrl}${item.book.coverImage}`}
                      alt={item.book.title}
                      style={{
                        height: 150,
                      }}
                    />
                    <div className="py-3 d-flex flex-column gap-2">
                      <Typography variant="body2" className="fs-5">
                        {item.book.title}
                      </Typography>
                      <Typography variant="body2">
                        {item.book.author}
                      </Typography>
                      <a
                        href={`${backendUrl}${item.book.bookPdf}`}
                        target="blank"
                      >
                        <button>Download</button>
                      </a>
                    </div>
                  </div>
                ))}
              </Card>
            </Grid>
          ))}
        </Grid>
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
