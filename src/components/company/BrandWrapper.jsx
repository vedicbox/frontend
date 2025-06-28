import { Box, Typography, styled } from "@mui/material";

import { env_props } from "env";

// STYLED COMPONENTS
const BrandRoot = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 18px 20px 0",
}));

export default function BrandWrapper() {
  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          {env_props.APP_NAME}
        </Typography>
      </Box>
    </BrandRoot>
  );
}
