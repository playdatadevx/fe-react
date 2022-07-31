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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import { FormattedMessage } from "react-intl";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

function ComplexStatisticsCard({ color, title, chartData, unit, icon, previous }) {
  const current = chartData[chartData.length - 1];
  const isCurrentHigher = current > previous;
  const percentageColor = isCurrentHigher ? "error" : "primary";
  const percentage = (current - previous) / previous;
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <MDTypography variant="h4">
            {current} {unit}
          </MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex">
          <MDTypography component="span" variant="button" fontWeight="bold" color={percentageColor}>
            {percentage}
            {unit}
          </MDTypography>
          &nbsp;
          <FormattedMessage id={isCurrentHigher ? "increase_than_month" : "decrease_than_month"} />
        </MDTypography>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.any).isRequired,
  icon: PropTypes.node.isRequired,
  previous: PropTypes.number.isRequired,
};

export default ComplexStatisticsCard;
