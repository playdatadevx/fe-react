import { Typography, Box } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
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
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="10vh">
        <LockOpenIcon fontSize="large" />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="10vh">
        <Typography variant="h3"> 페이지를 볼 수 있는 권한이 없습니다.</Typography>
      </Box>
    </Box>
  );
}

export default PrivateRoute;
