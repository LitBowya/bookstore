import { useGetAllPaymentsQuery } from "../../slices/paymentApiSlice";
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
  CircularProgress,
} from "@mui/material";

const Payments = () => {
  const { data: payments, isLoading, error } = useGetAllPaymentsQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading payments</div>;

  // Check if payments data is an array and has elements
  const hasPayments = payments && payments.length > 0;

  return (
    <Container>
      <Card className="p-3">
        <h4 className='mb-2'>Payment</h4>
        {hasPayments ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Payment Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>{payment.transactionId}</TableCell>
                    <TableCell>
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h6>No payments found</h6>
        )}
      </Card>
    </Container>
  );
};

export default Payments;
