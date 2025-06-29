import { Button } from "@mui/material";
import Iconify from "components/icons/Iconify";
import PageRedirectTemplate from "components/template/pageRedirect";
import { staff_mnlst } from "list/menulist";
import { DASHBOARD_HEADER } from "list/tableColist";
import { NavLink, useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFetchTbStaffQuery } from "service/staffService";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  img: PLACEHOLDER_IMG.NO_STAFF,
  heading: PLACEHOLDER_MSG.NO_STAFF,
};

export default function StaffManagePage() {
  const navigate = useNavigate();

  const { data } = useFetchTbStaffQuery();

  const handleEdit = (row) => {
    navigate(PARAMS_ROUTE.EDIT, {
      state: { userId: row.userRef._id, staffId: row._id },
    });
  };

  const handleBoard = (row) => {
    navigate(PARAMS_ROUTE.BOARD, {
      state: { userId: row.userRef._id, staffId: row._id },
    });
  };

  const listenerBox = (row) => {
    return {
      edit: () => handleEdit(row),
      board: () => handleBoard(row),
    };
  };

  return (
    <>
      <div className="text-right">
        <Button
          variant="contained"
          startIcon={<Iconify icon="basil:add-solid" />}
          component={NavLink}
          to={PARAMS_ROUTE.CREATE}
        >
          Enroll Staff
        </Button>
      </div>
      <PageRedirectTemplate
        title="Clinic"
        header={DASHBOARD_HEADER.STAFF.MANAGE}
        rows={data?.payload || []}
        createObj={{
          title: "Add Staff",
          icon: "hugeicons:add-team",
        }}
        actionList={(row) => staff_mnlst(listenerBox(row))}
        placeholderDetails={placeholderDetails}
      />
    </>
  );
}
