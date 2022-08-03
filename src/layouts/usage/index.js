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
import { useIntl } from "react-intl";
import axios from "axios";
import { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import MDBox from "../../components/MDBox";
import labels from "../labels.json";

import PrivateRoute from "../../keycloak/PrivateRoute";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsLineChart from "../../examples/Charts/LineCharts/ReportsLineChart";

function UsageDashboard() {
  const keycloak = useKeycloak();
  const intl = useIntl();
  const ONE_HOUR = 3600000;

  const initialState = {
    unit: "",
    created_at: "0000-00-00 00:00:00",
    data: [0, 0],
  };
  const [hourlyCpu, setHourlyCpu] = useState(initialState);
  const [dailyCpu, setDailyCpu] = useState(initialState);
  const [monthlyCpu, setMonthlyCpu] = useState(initialState);
  const [hourlyMemory, setHourlyMemory] = useState(initialState);
  const [dailyMemory, setDailyMemory] = useState(initialState);
  const [monthlyMemory, setMonthlyMemory] = useState(initialState);
  const [hourlyDisk, setHourlyDisk] = useState(initialState);
  const [dailyDisk, setDailyDisk] = useState(initialState);
  const [monthlyDisk, setMonthlyDisk] = useState(initialState);
  const [hourlyStorage, setHourlyStorage] = useState(initialState);
  const [dailyStorage, setDailyStorage] = useState(initialState);
  const [monthlyStorage, setMonthlyStorage] = useState(initialState);
  const [hourlyTraffic, setHourlyTraffic] = useState(initialState);
  const [dailyTraffic, setDailyTraffic] = useState(initialState);
  const [monthlyTraffic, setMonthlyTraffic] = useState(initialState);
  const [hourlyNode, setHourlyNode] = useState(initialState);
  const [dailyNode, setDailyNode] = useState(initialState);
  const [monthlyNode, setMonthlyNode] = useState(initialState);
  const [previousMonthCpu, setPreviousMonthCpu] = useState(0);
  const [previousMonthMemory, setPreviousMonthMemory] = useState(0);
  const [previousMonthStorage, setPreviousMonthStorage] = useState(0);
  const [previousMonthNode, setPreviousMonthNode] = useState(0);

  function getData(callback, period, type) {
    try {
      if (!keycloak.keycloak.token) callback(initialState);
      axios
        .get(
          `${process.env.REACT_APP_API}/usage`,
          {
            params: { period, type },
            headers: {
              Authorization: keycloak.keycloak.token,
            },
          },
          {
            withCredentials: true,
          }
        )
        .then((axiosResponse) => {
          const response = axiosResponse.data;
          if (period === "month") {
            if (type === "cpu") setPreviousMonthCpu(response.data[response.data.length - 2]);
            else if (type === "memory")
              setPreviousMonthMemory(response.data[response.data.length - 2]);
            else if (type === "storage")
              setPreviousMonthStorage(response.data[response.data.length - 2]);
            else if (type === "node") setPreviousMonthNode(response.data[response.data.length - 2]);
          }
          callback(response);
        });
    } catch (error) {
      reportError({ message: error.message });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getData(setHourlyCpu, "time", "cpu");
      getData(setDailyCpu, "day", "cpu");
      getData(setMonthlyCpu, "month", "cpu");
      getData(setHourlyMemory, "time", "memory");
      getData(setDailyMemory, "day", "memory");
      getData(setMonthlyMemory, "month", "memory");
      getData(setHourlyDisk, "time", "disk");
      getData(setDailyDisk, "day", "disk");
      getData(setMonthlyDisk, "month", "disk");
      getData(setHourlyStorage, "time", "storage");
      getData(setDailyStorage, "day", "storage");
      getData(setMonthlyStorage, "month", "storage");
      getData(setHourlyNode, "time", "node");
      getData(setDailyNode, "day", "node");
      getData(setMonthlyNode, "month", "node");
      getData(setHourlyTraffic, "time", "traffic");
      getData(setDailyTraffic, "day", "traffic");
      getData(setMonthlyTraffic, "month", "traffic");
    }, 500);

    const interval = setInterval(() => {
      getData(setHourlyCpu, "time", "cpu");
      getData(setDailyCpu, "day", "cpu");
      getData(setMonthlyCpu, "month", "cpu");
      getData(setHourlyMemory, "time", "memory");
      getData(setDailyMemory, "day", "memory");
      getData(setMonthlyMemory, "month", "memory");
      getData(setHourlyDisk, "time", "disk");
      getData(setDailyDisk, "day", "disk");
      getData(setMonthlyDisk, "month", "disk");
      getData(setHourlyStorage, "time", "storage");
      getData(setDailyStorage, "day", "storage");
      getData(setMonthlyStorage, "month", "storage");
      getData(setHourlyNode, "time", "node");
      getData(setDailyNode, "day", "node");
      getData(setMonthlyNode, "month", "node");
      getData(setHourlyTraffic, "time", "traffic");
      getData(setDailyTraffic, "day", "traffic");
      getData(setMonthlyTraffic, "month", "traffic");
    }, ONE_HOUR);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PrivateRoute>
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="paid"
                  title={intl.formatMessage({ id: "cpu_usage_title" })}
                  unit={monthlyCpu.unit}
                  previous={previousMonthCpu}
                  chartData={monthlyCpu.data}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="price_change"
                  title={intl.formatMessage({ id: "memory_usage_title" })}
                  unit={monthlyMemory.unit}
                  previous={previousMonthMemory}
                  chartData={monthlyMemory.data}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="grid_view"
                  title={intl.formatMessage({ id: "node_usage_title" })}
                  unit={monthlyNode.unit}
                  previous={previousMonthNode}
                  chartData={monthlyNode.data}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="storage"
                  title={intl.formatMessage({ id: "storage_usage_title" })}
                  unit={monthlyStorage.unit}
                  previous={previousMonthStorage}
                  chartData={monthlyStorage.data}
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
                    title={intl.formatMessage({ id: "hourly_cpu_usage_title" })}
                    description={intl.formatMessage({ id: "hourly_cpu_usage_description" })}
                    labels={labels.hourly_chart_labels}
                    unit={hourlyCpu.unit}
                    created_at={hourlyCpu.created_at}
                    chartData={hourlyCpu.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="info"
                    title={intl.formatMessage({ id: "daily_cpu_usage_title" })}
                    description={intl.formatMessage({ id: "daily_cpu_usage_description" })}
                    labels={labels.daily_chart_labels}
                    unit={dailyCpu.unit}
                    created_at={hourlyCpu.created_at}
                    chartData={dailyCpu.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="info"
                    title={intl.formatMessage({ id: "monthly_cpu_usage_title" })}
                    description={intl.formatMessage({ id: "monthly_cpu_usage_description" })}
                    labels={labels.monthly_chart_labels}
                    unit={monthlyCpu.unit}
                    created_at={hourlyCpu.created_at}
                    chartData={monthlyCpu.data}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="primary"
                    title={intl.formatMessage({ id: "hourly_memory_usage_title" })}
                    description={intl.formatMessage({ id: "hourly_memory_usage_description" })}
                    labels={labels.hourly_chart_labels}
                    unit={hourlyMemory.unit}
                    created_at={hourlyMemory.created_at}
                    chartData={hourlyMemory.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="primary"
                    title={intl.formatMessage({ id: "daily_memory_usage_title" })}
                    description={intl.formatMessage({ id: "daily_memory_usage_description" })}
                    labels={labels.daily_chart_labels}
                    unit={dailyMemory.unit}
                    created_at={hourlyMemory.created_at}
                    chartData={dailyMemory.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="primary"
                    title={intl.formatMessage({ id: "monthly_memory_usage_title" })}
                    description={intl.formatMessage({ id: "monthly_memory_usage_description" })}
                    labels={labels.monthly_chart_labels}
                    unit={monthlyMemory.unit}
                    created_at={hourlyMemory.created_at}
                    chartData={monthlyMemory.data}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="success"
                    title={intl.formatMessage({ id: "hourly_node_usage_title" })}
                    description={intl.formatMessage({ id: "hourly_node_usage_description" })}
                    labels={labels.hourly_chart_labels}
                    unit={hourlyNode.unit}
                    created_at={hourlyNode.created_at}
                    chartData={hourlyNode.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="success"
                    title={intl.formatMessage({ id: "daily_node_usage_title" })}
                    description={intl.formatMessage({ id: "daily_node_usage_description" })}
                    labels={labels.daily_chart_labels}
                    unit={dailyNode.unit}
                    created_at={hourlyNode.created_at}
                    chartData={dailyNode.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="success"
                    title={intl.formatMessage({ id: "monthly_node_usage_title" })}
                    description={intl.formatMessage({ id: "monthly_node_usage_description" })}
                    labels={labels.monthly_chart_labels}
                    unit={monthlyNode.unit}
                    created_at={hourlyNode.created_at}
                    chartData={monthlyNode.data}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="secondary"
                    title={intl.formatMessage({ id: "hourly_traffic_usage_title" })}
                    description={intl.formatMessage({ id: "hourly_traffic_usage_description" })}
                    labels={labels.hourly_chart_labels}
                    unit={hourlyTraffic.unit}
                    created_at={hourlyTraffic.created_at}
                    chartData={hourlyTraffic.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="secondary"
                    title={intl.formatMessage({ id: "daily_traffic_usage_title" })}
                    description={intl.formatMessage({ id: "daily_traffic_usage_description" })}
                    labels={labels.daily_chart_labels}
                    unit={dailyTraffic.unit}
                    created_at={hourlyTraffic.created_at}
                    chartData={dailyTraffic.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="secondary"
                    title={intl.formatMessage({ id: "monthly_traffic_usage_title" })}
                    description={intl.formatMessage({ id: "monthly_traffic_usage_description" })}
                    labels={labels.monthly_chart_labels}
                    unit={monthlyTraffic.unit}
                    created_at={hourlyTraffic.created_at}
                    chartData={monthlyTraffic.data}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="warning"
                    title={intl.formatMessage({ id: "hourly_disk_usage_title" })}
                    description={intl.formatMessage({ id: "hourly_disk_usage_description" })}
                    labels={labels.hourly_chart_labels}
                    unit={hourlyDisk.unit}
                    created_at={hourlyDisk.created_at}
                    chartData={hourlyDisk.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="warning"
                    title={intl.formatMessage({ id: "daily_disk_usage_title" })}
                    description={intl.formatMessage({ id: "daily_disk_usage_description" })}
                    labels={labels.daily_chart_labels}
                    unit={dailyDisk.unit}
                    created_at={hourlyDisk.created_at}
                    chartData={dailyDisk.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="warning"
                    title={intl.formatMessage({ id: "monthly_disk_usage_title" })}
                    description={intl.formatMessage({ id: "monthly_disk_usage_description" })}
                    labels={labels.monthly_chart_labels}
                    unit={monthlyDisk.unit}
                    created_at={hourlyDisk.created_at}
                    chartData={monthlyDisk.data}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title={intl.formatMessage({ id: "hourly_storage_usage_title" })}
                    description={intl.formatMessage({ id: "hourly_storage_usage_description" })}
                    labels={labels.hourly_chart_labels}
                    unit={hourlyStorage.unit}
                    created_at={hourlyStorage.created_at}
                    chartData={hourlyStorage.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title={intl.formatMessage({ id: "daily_storage_usage_title" })}
                    description={intl.formatMessage({ id: "daily_storage_usage_description" })}
                    labels={labels.daily_chart_labels}
                    unit={dailyStorage.unit}
                    created_at={hourlyStorage.created_at}
                    chartData={dailyStorage.data}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title={intl.formatMessage({ id: "monthly_storage_usage_title" })}
                    description={intl.formatMessage({ id: "monthly_storage_usage_description" })}
                    labels={labels.monthly_chart_labels}
                    unit={monthlyStorage.unit}
                    created_at={hourlyStorage.created_at}
                    chartData={monthlyStorage.data}
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

export default UsageDashboard;
