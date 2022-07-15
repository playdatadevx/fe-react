import { Typography, Box } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import React from "react";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  return isLoggedIn ? (
    children
  ) : (
    <Box>
      <Typography variant="h3"> 페이지를 볼 수 있는 권한이 없습니다. </Typography>
    </Box>
  );
}

export default PrivateRoute;
