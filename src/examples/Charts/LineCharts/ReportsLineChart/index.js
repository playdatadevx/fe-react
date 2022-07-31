/* eslint-disable react/prop-types */
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

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { FormattedMessage } from "react-intl";
import configs from "examples/Charts/LineCharts/ReportsLineChart/configs";

function changeOrder(labels, createdAt) {
  const newLabels = [];
  const timeOfDay = new Date(createdAt).getHours();
  const dayOfWeek = new Date(createdAt).getDay();
  const monthOfYear = new Date(createdAt).getMonth() + 1;

  switch (labels.length) {
    case 24:
      for (let i = 0; i < labels.length; i += 1) {
        let position = timeOfDay - i - 1;
        if (timeOfDay - i <= 0) position = 24 + position;
        newLabels[24 - i - 1] = labels[position];
      }
      break;
    case 7:
      for (let i = 0; i < labels.length; i += 1) {
        let position = dayOfWeek - i - 1;
        if (dayOfWeek - i <= 0) position = 7 + position;
        newLabels[7 - i - 1] = labels[position];
      }
      break;
    case 12:
      for (let i = 0; i < labels.length; i += 1) {
        let position = monthOfYear - i - 1;
        if (monthOfYear - i <= 0) position = 12 + position;
        newLabels[12 - i - 1] = labels[position];
      }
      break;
    default:
      break;
  }
  return newLabels;
}
// eslint-disable-next-line camelcase
function ReportsLineChart({ color, title, description, labels, chartData, unit, created_at }) {
  const newLables = changeOrder(labels, created_at);
  const datasets = { label: unit, data: chartData };
  const { data, options } = configs(newLables || [], datasets || {});
  const now = new Date().getTime();
  const createdAt = new Date(created_at).getTime();
  const milliSec = now - createdAt;
  const minute = milliSec / 1000 / 60;
  const minutesAgo = parseInt(minute, 10);
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
        {useMemo(
          () => (
            <MDBox
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              coloredShadow={color}
              py={2}
              pr={0.5}
              mt={-5}
              height="12.5rem"
            >
              <Line data={data} options={options} />
            </MDBox>
          ),
          [datasets, color]
        )}
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              {minutesAgo}
              <FormattedMessage id="minutes_ago" />
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ReportsLineChart
ReportsLineChart.defaultProps = {
  color: "dark",
};

// Typechecking props for the ReportsLineChart
ReportsLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  labels: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  chartData: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string.isRequired,
};

export default ReportsLineChart;
