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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import PrivateRoute from "../../keycloak/PrivateRoute";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

// Data
import costData from "./data/exampleCostData";
import expCostData from "./data/exampleExpCostData";
import stausData from "./data/exampleStatusData";
import timeData from "./data/exampleTimeData";
import dayData from "./data/exampleDayData";
import monthData from "./data/exampleMonthData";

import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsLineChart from "../../examples/Charts/LineCharts/ReportsLineChart";

// Keycloak

function CostDashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PrivateRoute>
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="info" icon="paid" {...costData} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="primary" icon="price_change" {...expCostData} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="success" icon="check_circle" {...stausData} />
              </MDBox>
            </Grid>
          </Grid>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="info" {...timeData} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="info" {...dayData} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="info" {...monthData} />
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
