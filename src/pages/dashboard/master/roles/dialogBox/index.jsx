import { Button } from "@mui/material";
import ClassicDialog from "components/dialog/ClassicDialog";
import Iconify from "components/icons/Iconify";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChildRoutes from "routes/childRoute";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useCreateRoleMutation } from "service/auth/roleService";
import { HTTP_STATUS_CODES } from "values/enum";
import CreateRole from "./CreateRole";

export default function RoleDialogBox({ dialogObj, setDialogObj }) {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [createRoleMutation, { isLoading }] = useCreateRoleMutation();

  const handleClose = () => {
    navigate(-1);
  };

  const handleRoleCreate = async () => {
    let packet = formRef.current.preparedData();

    let { data, error } = await createRoleMutation(packet);

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
          <CreateRole ref={formRef} />
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
