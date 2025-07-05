import { Button, Grid2 } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import Iconify from "components/icons/Iconify";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { NavLink, useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useGetTBRolesQuery } from "service/auth/roleService";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";
import RoleDialogBox from "./dialogBox";

const placeholderDetails = {
  img: PLACEHOLDER_IMG.NO_ROLES,
  heading: PLACEHOLDER_MSG.NO_ROLES,
};

export default function MasterRolePage() {
  const navigate = useNavigate();

  const { data: roleData } = useGetTBRolesQuery();
  let rolePayload = roleData?.payload?.rolelist || [];

  const handleEditAction = (row) => {
    navigate(PARAMS_ROUTE.EDIT, { state: row });
  };

  const handleDeleteAction = (row) => {
    navigate(PARAMS_ROUTE.DELETE, { state: row.id });
  };

  const listenerBox = (row) => {
    return {
      edit: () => handleEditAction(row),
      delete: () => handleDeleteAction(row),
    };
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.PATIENTS.ENROLL}>
        <Button
          variant="contained"
          startIcon={<Iconify icon="" />}
          component={NavLink}
          to={PARAMS_ROUTE.CREATE}
        >
          Add Role
        </Button>
      </CollapsedBreadcrumbs>

      <Grid2 container>
        <Grid2 size={6}></Grid2>
        <Grid2 size={6}></Grid2>
      </Grid2>

      <RoleDialogBox />
    </>
  );
}
