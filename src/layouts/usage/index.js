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
import cpuData from "./data/exampleCPUData";
import memoryData from "./data/exampleMemoryData";
import nodeData from "./data/exampleNodeData";
import storageData from "./data/exampleStorageData";

import timeTrafficData from "./data/exampleTimeTrafficData";
import dayTrafficData from "./data/exampleDayTrafficData";
import monthTrafficData from "./data/exampleMonthTrafficData";

import timeCPUData from "./data/exampleTimeCPUData";
import dayCPUData from "./data/exampleDayCPUData";
import monthCPUData from "./data/exampleMonthCPUData";

import timeMemoryData from "./data/exampleTimeMemoryData";
import dayMemoryData from "./data/exampleDayMemoryData";
import monthMemoryData from "./data/exampleMonthMemoryData";

import timeNodeData from "./data/exampleTimeNodeData";
import dayNodeData from "./data/exampleDayNodeData";
import monthNodeData from "./data/exampleMonthNodeData";

import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsLineChart from "../../examples/Charts/LineCharts/ReportsLineChart";

// Keycloak

function UsageDashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PrivateRoute>
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="info" icon="paid" {...cpuData} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="primary" icon="price_change" {...memoryData} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="success" icon="grid_view" {...nodeData} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="dark" icon="storage" {...storageData} />
              </MDBox>
            </Grid>
          </Grid>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="info" {...timeCPUData} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="info" {...dayCPUData} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="info" {...monthCPUData} />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="primary" {...timeMemoryData} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="primary" {...dayMemoryData} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="primary" {...monthMemoryData} />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="success" {...timeNodeData} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="success" {...dayNodeData} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="success" {...monthNodeData} />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="dark" {...timeTrafficData} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="dark" {...dayTrafficData} />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart color="dark" {...monthTrafficData} />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </PrivateRoute>
    </DashboardLayout>
  );
}

export default UsageDashboard;
