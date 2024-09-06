import {
  Box,
  CircularProgress,
  Grid,
  Container,
} from "@mui/material";
import { useGetCountsQuery } from "../../slices/statisticsApiSlice";
import CountUp from "react-countup";
import CountCss from "./Count.module.css";

const CountsSection = () => {
  const { data, isLoading, error } = useGetCountsQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <h4>Error loading counts.</h4>;

  const { bookCount, orderCount, userCount, categoryCount } = data;

  return (
    <div className={CountCss.container}>
      <Container>
        <Box>
          <h4>Bookstore Statistics</h4>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <h5>Total Books</h5>
              <h6>
                <CountUp start={0} end={bookCount.length} duration={5} />
              </h6>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <h5>Total Orders</h5>
              <h6>
                <CountUp start={0} end={orderCount.length} duration={5} />
              </h6>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <h5>Total Users</h5>
              <h6>
                <CountUp start={0} end={userCount.length} duration={5} />
              </h6>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <h5>Categories Of Books</h5>
              <h6>
                <CountUp start={0} end={categoryCount.length} duration={5} />
              </h6>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default CountsSection;
