import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BrandWrapper from "components/company/BrandWrapper";
import { env_props } from "env";

export default function AuthWrapper({ children }) {
  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 6 }}>
        <div className="px-3">
          <BrandWrapper />
          {children}
        </div>
      </Grid>
      <Grid
        sx={{ display: { xs: "none", md: "block" } }}
        size={{ xs: 12, md: 6 }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="mt-4"
        >
          <Typography
            color="inherit"
            sx={{ fontSize: "24px", lineHeight: "32px", textAlign: "center" }}
            variant="h4"
          >
            Welcome to --
          </Typography>

          <Typography className="ml-2" variant="h5" color="primary">
            {env_props.APP_NAME}
          </Typography>
        </Stack>

        <Typography align="center" variant="subtitle1" className="mt-3 mb-4">
          A professional template that comes with ready-to-use MUI components.
        </Typography>
        <Box
          component="img"
          alt="Widgets"
          src="/assets/images/auth-widgets.png"
          sx={{ height: "auto", width: "100%", maxWidth: "600px" }}
        />
      </Grid>
    </Grid>
  );
}
