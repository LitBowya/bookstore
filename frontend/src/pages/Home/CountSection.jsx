
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { useGetCountsQuery } from "../../slices/statisticsApiSlice";
import CountUp from "react-countup";

const CountsSection = () => {
  const { data, isLoading, error } = useGetCountsQuery();

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography variant="h6" color="error">
        Error loading counts.
      </Typography>
    );

  const { bookCount, orderCount, userCount, categoryCount } = data;

  return (
    <Container>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bookstore Statistics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">Total Books</Typography>
                <Typography variant="h4">
                  <CountUp start={0} end={bookCount.length} duration={5} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4">
                  <CountUp start={0} end={orderCount.length} duration={5} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">
                  <CountUp start={0} end={userCount.length} duration={5} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">Categories Of Books</Typography>
                <Typography variant="h4">
                  <CountUp start={0} end={categoryCount.length} duration={5} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CountsSection;
