
import { Card, CardContent, Grid, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { useGetCountsQuery } from "../../slices/statisticsApiSlice";

// Function to extract month from createdAt date string
const getMonthFromCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return date.getMonth(); // 0 = January, 11 = December
};

// Function to initialize a full year data structure
const initializeFullYearData = () => {
  return [
    { month: "Jan", count: 0 },
    { month: "Feb", count: 0 },
    { month: "Mar", count: 0 },
    { month: "Apr", count: 0 },
    { month: "May", count: 0 },
    { month: "Jun", count: 0 },
    { month: "Jul", count: 0 },
    { month: "Aug", count: 0 },
    { month: "Sep", count: 0 },
    { month: "Oct", count: 0 },
    { month: "Nov", count: 0 },
    { month: "Dec", count: 0 },
  ];
};

// Function to process the count data and populate it by month
const processDataByMonth = (countData) => {
  const yearData = initializeFullYearData();

  countData.forEach((item) => {
    const monthIndex = getMonthFromCreatedAt(item.createdAt);
    yearData[monthIndex].count += 1; // Increment count for that month
  });

  return yearData;
};

const AdminDashboard = () => {
  const { data, error, isLoading } = useGetCountsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const { bookCount, orderCount, userCount, categoryCount } = data;

  const cardData = [
    {
      title: "Books",
      count: bookCount.length,
      icon: <BookIcon />,
      bgColor: "#ffebee",
      iconColor: "#c62828",
    },
    {
      title: "Orders",
      count: orderCount.length,
      icon: <ShoppingCartIcon />,
      bgColor: "#e3f2fd",
      iconColor: "#1565c0",
    },
    {
      title: "Users",
      count: userCount.length,
      icon: <PeopleIcon />,
      bgColor: "#e8f5e9",
      iconColor: "#2e7d32",
    },
    {
      title: "Category Of Books",
      count: categoryCount.length,
      icon: <CategoryIcon />,
      bgColor: "#fff3e0",
      iconColor: "#ef6c00",
    },
  ];

  // Process userCount and orderCount data for graphs
  const userLineData = [
    {
      id: "Users",
      data: processDataByMonth(userCount, "count").map((item) => ({
        x: item.month,
        y: item.count,
      })),
    },
  ];

  const orderBarData = processDataByMonth(orderCount, "count").map((item) => ({
    month: item.month,
    orders: item.count,
  }));

  return (
    <div>
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card style={{ backgroundColor: card.bgColor }}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <div style={{ color: card.iconColor, fontSize: 40 }}>
                      {card.icon}
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h5">{card.count}</Typography>
                    <Typography variant="subtitle1">{card.title}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Graphs */}
      <Grid container spacing={3} style={{ marginTop: 30 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Users Over Time
              </Typography>
              <div style={{ height: 300 }}>
                <ResponsiveLine
                  data={userLineData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                  }}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Month",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Users",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  colors={{ scheme: "nivo" }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Orders Per Month
              </Typography>
              <div style={{ height: 300 }}>
                <ResponsiveBar
                  data={orderBarData}
                  keys={["orders"]}
                  indexBy="month"
                  margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                  padding={0.3}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Month",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Orders",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  colors={{ scheme: "nivo" }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
