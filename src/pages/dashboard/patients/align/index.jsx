import { Button } from "@mui/material";
import Iconify from "components/icons/Iconify";
import PageRedirectTemplate from "components/template/pageRedirect";
import { alignPt_mnlst } from "list/menulist";
import { DASHBOARD_HEADER } from "list/tableColist";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useAlignPatientListQuery } from "service/patientService";
import { PLACEHOLDER_MSG } from "values/messages";
import DialogBox from "./dialogBox";
import { PLACEHOLDER_IMG } from "values/img-links";

const placeholderDetails = {
  img: PLACEHOLDER_IMG.NO_PATIENTS_ALIGN,
  heading: PLACEHOLDER_MSG.NO_PATIENTS_ALIGN,
};

export default function ManagePatient() {
  const navigate = useNavigate();
  const [dialogObj, setDialogObj] = useState({});

  const { data: alignPtlist } = useAlignPatientListQuery();

  const handleSearch = () => {
    navigate(PARAMS_ROUTE.SEARCH);
  };

  const handleDialogStatus = (row) => {
    setDialogObj(row);
    navigate(PARAMS_ROUTE.MOVE);
  };

  const listenerBox = (row) => {
    return {
      move: () => handleDialogStatus(row),
    };
  };

  return (
    <>
      <div className="text-right">
        <Button
          variant="contained"
          startIcon={<Iconify icon="icon-park-twotone:appointment" />}
          onClick={handleSearch}
        >
          Consult
        </Button>
      </div>

      <PageRedirectTemplate
        header={DASHBOARD_HEADER.PATIENTS.ALIGN}
        rows={alignPtlist?.payload || []}
        placeholderDetails={placeholderDetails}
        actionList={(row) => alignPt_mnlst(listenerBox(row))}
      />

      <DialogBox dialogObj={dialogObj} setDialogObj={setDialogObj} />
    </>
  );
}
