import { Button } from "@mui/material";
import ClassicDialog from "components/dialog/ClassicDialog";
import Iconify from "components/icons/Iconify";
import { useNavigate } from "react-router-dom";
import ChildRoutes from "routes/childRoute";
import { DASHBOARD_ROUTE, PARAMS_ROUTE } from "routes/routeurl";
import { useChangeAlignPtStatusMutation } from "service/patientService";
import { HTTP_STATUS_CODES, PATENT_JOURNEY } from "values/enum";
import MovePage from "./MovePage";
import ViewPage from "./SearchPage";

export default function DialogBox({ dialogObj, setDialogObj }) {
  const navigate = useNavigate();
  const [changePtStatus, { isLoading }] = useChangeAlignPtStatusMutation();

  const handleClose = () => {
    setDialogObj({});
    navigate(-1);
  };

  const handleNewPatient = () => {
    navigate(`/${DASHBOARD_ROUTE.PATIENT.ENROLL}`);
  };

  const handlePtStatus = async () => {
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

  const searchAction = (
    <>
      <Button
        variant="contained"
        startIcon={<Iconify icon="system-uicons:create" />}
        onClick={handleNewPatient}
      >
        Add New
      </Button>
    </>
  );

  const moveAction = (
    <>
      <Button
        variant="contained"
        startIcon={<Iconify icon="system-uicons:create" />}
        onClick={handlePtStatus}
      >
        Submit
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
      path: PARAMS_ROUTE.SEARCH,
      element: (
        <WrapContainer actionContainer={searchAction} title="Search">
          <ViewPage />
        </WrapContainer>
      ),
    },
    {
      path: PARAMS_ROUTE.MOVE,
      element: (
        <WrapContainer actionContainer={moveAction} title="What's Next">
          <MovePage />
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
