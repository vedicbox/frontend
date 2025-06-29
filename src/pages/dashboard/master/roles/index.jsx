import PageRedirectTemplate from "components/template/pageRedirect";
import { crud_mnlst } from "list/menulist";
import { DASHBOARD_HEADER } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useGetTBRolesQuery } from "service/auth/roleService";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

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
      <PageRedirectTemplate
        title="Clinic"
        header={DASHBOARD_HEADER.MASTER.ROLES}
        rows={rolePayload || []}
        createObj={{
          title: "Add Staff",
          icon: "hugeicons:add-team",
        }}
        actionList={(row) => crud_mnlst(listenerBox(row))}
        placeholderDetails={placeholderDetails}
      />
    </>
  );
}
