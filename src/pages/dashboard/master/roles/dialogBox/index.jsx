import { Button } from "@mui/material";
import ClassicDialog from "components/dialog/ClassicDialog";
import Iconify from "components/icons/Iconify";
import { useNavigate } from "react-router-dom";
import ChildRoutes from "routes/childRoute";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useChangeAlignPtStatusMutation } from "service/patientService";
import { HTTP_STATUS_CODES, PATENT_JOURNEY } from "values/enum";
import CreateRole from "./CreateRole";

export default function RoleDialogBox({ dialogObj, setDialogObj }) {
  const navigate = useNavigate();
  const [changePtStatus, { isLoading }] = useChangeAlignPtStatusMutation();

  const handleClose = () => {
    setDialogObj({});
    navigate(-1);
  };

  const handleRoleCreate = async () => {
    const packet = {
      alignPatientId: dialogObj._id,
      status: PATENT_JOURNEY.COMPLETE,
    };

    let { data, error } = await changePtStatus(packet);

    if (data?.status == HTTP_STATUS_CODES.OK) {
      navigate(-1);
    } else if (error.data?.payload) {
    }
  };

  const dialogAction = (
    <>
      <Button
        variant="contained"
        startIcon={<Iconify icon="system-uicons:create" />}
        onClick={handleRoleCreate}
      >
        Create
      </Button>
    </>
  );

  const WrapContainer = ({ title, actionContainer, children }) => {
    return (
      <ClassicDialog
        open={true}
        title={title}
        handleToggle={handleClose}
        actionContainer={actionContainer}
      >
        {children}
      </ClassicDialog>
    );
  };

  const routelist = [
    {
      path: PARAMS_ROUTE.CREATE,
      element: (
        <WrapContainer actionContainer={dialogAction} title="New Role">
          <CreateRole />
        </WrapContainer>
      ),
    },
  ];

  return (
    <>
      <ChildRoutes routelist={routelist} />
    </>
  );
}
