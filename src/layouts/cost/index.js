/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Grid from "@mui/material/Grid";

import { useIntl } from "react-intl";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Typography, Box } from "@mui/material";
// import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import MDBox from "../../components/MDBox";
import labels from "../labels.json";
import PrivateRoute from "../../keycloak/PrivateRoute";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsLineChart from "../../examples/Charts/LineCharts/ReportsLineChart";

function CostDashboard() {
  const keycloak = useKeycloak();
  const intl = useIntl();
  const ONE_HOUR = 3600000;

  const initialState = {
    unit: "-",
    created_at: "0000-00-00 00:00:00",
    data: [0, 0],
  };

  const [hourlyCost, setHourlyCost] = useState(initialState);
  const [dailyCost, setDailyCost] = useState(initialState);
  const [monthlyCost, setMonthlyCost] = useState(initialState);
  const [expectedCost, setExpectedCost] = useState(initialState);
  const [monthlyCapacity, setMonthlyCapacity] = useState(initialState);
  const [previousMonthCost, setPreviousMonthCost] = useState(0);
  const [previousMonthCapcity, setPreviousMonthCapcity] = useState(0);

  function getData(callback, path, period) {
    try {
      if (!keycloak.keycloak.token) callback(initialState);
      axios
        .get(path, {
          params: { period },
          headers: {
            Authorization: keycloak.keycloak.token,
          },
        })
        .then((axiosResponse) => {
          const response = axiosResponse.data;
          if (period === "month") {
            if (path === "/cost") setPreviousMonthCost(response.data[response.data.length - 2]);
            else if (path === "/capacity")
              setPreviousMonthCapcity(response.data[response.data.length - 2]);
          }
          callback(response);
        });
    } catch (error) {
      reportError({ message: error.message });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getData(setHourlyCost, "/cost", "time");
      getData(setDailyCost, "/cost", "day");
      getData(setMonthlyCost, "/cost", "month");
      getData(setExpectedCost, "/exp-cost");
      getData(setMonthlyCapacity, "/capacity", "month");
    }, 500);

    const interval = setInterval(() => {
      getData(setHourlyCost, "/cost", "time");
      getData(setDailyCost, "/cost", "day");
      getData(setMonthlyCost, "/cost", "month");
      getData(setExpectedCost, "/exp-cost");
      getData(setMonthlyCapacity, "/capacity", "month");
    }, ONE_HOUR);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PrivateRoute>
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="paid"
                  title={intl.formatMessage({ id: "current_cost_title" })}
                  unit={monthlyCost.unit}
                  previous={previousMonthCost}
                  chartData={monthlyCost.data}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="price_change"
                  title={intl.formatMessage({ id: "expect_cost_title" })}
                  unit={expectedCost.unit}
                  previous={previousMonthCost}
                  chartData={expectedCost.data}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="check_circle"
                  title={intl.formatMessage({ id: "capacity_title" })}
                  unit={monthlyCapacity.unit}
                  previous={previousMonthCapcity}
                  chartData={monthlyCapacity.data}
                />
              </MDBox>
            </Grid>
          </Grid>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="info"
                    title={intl.formatMessage({ id: "hourly_cost_title" })}
                    description={intl.formatMessage({ id: "hourly_cost_description" })}
                    labels={labels.hourly_chart_labels}
                    unit={hourlyCost.unit}
                    created_at={hourlyCost.created_at}
                    chartData={hourlyCost.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="info"
                    title={intl.formatMessage({ id: "daily_cost_title" })}
                    description={intl.formatMessage({ id: "daily_cost_description" })}
                    labels={labels.daily_chart_labels}
                    unit={dailyCost.unit}
                    created_at={dailyCost.created_at}
                    chartData={dailyCost.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="info"
                    title={intl.formatMessage({ id: "monthly_cost_title" })}
                    description={intl.formatMessage({ id: "monthly_cost_description" })}
                    labels={labels.monthly_chart_labels}
                    unit={monthlyCost.unit}
                    created_at={monthlyCost.created_at}
                    chartData={monthlyCost.data}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </PrivateRoute>
    </DashboardLayout>
  );
}

export default CostDashboard;
