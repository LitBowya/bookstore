import { useState } from "react";
import { useGetAllOrdersQuery } from "../../slices/orderApiSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Card,
  CardContent,
  Container,
    CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Orders = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();
  const [expanded, setExpanded] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading orders</div>;

  return (
    <Container>
      <Card className="p-3">
        <h4 className='mb-2'>Orders</h4>
        {orders &&
          orders.orders.map((order) => (
            <Accordion
              key={order._id}
              expanded={expanded === order._id}
              onChange={handleChange(order._id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${order._id}-content`}
                id={`panel-${order._id}-header`}
              >
                <Typography>
                  Order ID: {order._id} | User: {order?.user?.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Order Details:</Typography>
                    <Typography>
                      <strong>Total Price:</strong> ${order.totalPrice}
                    </Typography>
                    <Typography>
                      <strong>Payment Method:</strong> {order.paymentMethod}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Shipping Address:
                    </Typography>
                    <Typography>
                      <strong>Street:</strong> {order.shippingAddress.street}
                    </Typography>
                    <Typography>
                      <strong>Town:</strong> {order.shippingAddress.town}
                    </Typography>
                    <Typography>
                      <strong>City:</strong> {order.shippingAddress.city}
                    </Typography>
                    <Typography>
                      <strong>Additional Info:</strong>{" "}
                      {order.shippingAddress.additionalInfo}
                    </Typography>
                    <Typography>
                      <strong>Region:</strong> {order.shippingAddress.region}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Order Items:
                    </Typography>
                    {order.orderItems.map((item) => (
                      <Typography key={item._id}>
                        <strong>Title:</strong> {item.title} |
                        <strong> Quantity:</strong> {item.qty} |
                        <strong> Price:</strong> ${item.price}
                      </Typography>
                    ))}
                    <Typography variant="h6" gutterBottom>
                      User Info
                    </Typography>
                    <Typography>
                      <strong>Name:</strong> {order?.user?.name}
                    </Typography>
                    <Typography>
                      <strong>Email:</strong> {order?.user?.email}
                    </Typography>
                    <Typography>
                      <strong>Contact:</strong>{" "}
                      {order?.user?.address[0]?.phoneNumber}
                    </Typography>
                    <Typography>
                      <strong>Profile Picture:</strong>{" "}
                      <img
                        src={`${backendUrl}${order?.user?.profilePicture}`}
                        alt="profile picture"
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </Typography>
                  </CardContent>
                </Card>
              </AccordionDetails>
            </Accordion>
          ))}
      </Card>
    </Container>
  );
};

export default Orders;
