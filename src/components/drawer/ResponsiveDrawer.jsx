import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import DisplayContent from "components/placeholder/DisplayContent";
import { env_props } from "env";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavDrawer_slice } from "store/root-reducer/global";
import BrandWrapper from "../company/BrandWrapper";
import NavContainer from "./navContainer";

const drawerWidth = 250;

function ResponsiveDrawer(props) {
  const { window, navlist, children, profileObj = {} } = props;
  const navDrawerStat = useSelector((state) => state.global.navDrawerStat);
  const dispatch = useDispatch();

  const toggleNavBar = () => {
    dispatch(toggleNavDrawer_slice());
  };

  const handleDrawerClose = () => {
    toggleNavBar();
  };

  const drawer = (
    <>
      <span className="pl-4">
        <BrandWrapper />
      </span>
      <Divider className="mb-2" />

      <Paper
        sx={{
          m: "0 10px",
          bgcolor: (theme) => theme.palette.primary[50],
          borderRadius: 5,
          p: "0 10px",
        }}
        elevation={1}
      >
        <DisplayContent valid1={profileObj.heading}>
          <ListItem alignItems="flex-start" className="p-1">
            <ListItemAvatar>
              <Avatar src={profileObj.src} />
            </ListItemAvatar>
            <ListItemText
              primary={profileObj.heading}
              secondary={<React.Fragment>{profileObj.subText1}</React.Fragment>}
            />
          </ListItem>
        </DisplayContent>
      </Paper>

      <NavContainer navlist={navlist} />
      <Divider />
      <p className="py-1 f-s-13 text-center">
        © Copyrights {env_props.APP_NAME} 2025.
      </p>
    </>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{
          display: { xs: "none", md: "block" },
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={navDrawerStat}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
