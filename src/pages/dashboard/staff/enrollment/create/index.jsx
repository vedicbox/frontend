import { LoadingButton } from "@mui/lab";
import { Grid2, Paper, Stack, Typography } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import StaffEnrollmentForm from "components/forms/staff/EnrollmentForm";
import EntityAssignForm from "components/forms/staff/EntityAssignForm";
import Iconify from "components/icons/Iconify";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStaffMutation } from "service/staffService";
import { parsePicker } from "utils/parse";
import { validateAll } from "utils/validation";
import { HTTP_STATUS_CODES } from "values/enum";

const rules = [];

export default function AddStaff() {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [processObj, setProcessObj] = useState({});
  const navigate = useNavigate();

  const [createStaffMutation] = useCreateStaffMutation();

  const handleSubmit = () => {
    const formData = Object.fromEntries(new FormData(formRef.current));
    formData["roleId"] = processObj["role"]?._id;
    formData["clinicId"] = processObj["clinic"]?._id;
    formData["dob"] = parsePicker(processObj.dob, "date");

    validateAll(rules, formData)
      .then(async (success) => {
        if (success) {
          let { data, error } = await createStaffMutation(formData);

          if (data?.status == HTTP_STATUS_CODES.OK) {
            navigate(-1);
          } else if (error.data?.payload) {
            setErrors({ ...error.data?.payload });
          }
        }
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  const handlePopulate = (key, value) => {
    setProcessObj((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.STAFF.ADD} />
      <Grid2 container justifyContent="center">
        <Grid2 size={{ md: 10, xs: 12 }}>
          <Stack
            direction="row"
            sx={{
              bgcolor: (theme) => theme.palette.primary[50],
              p: "10px",
              borderBottomLeftRadius: 10,
              borderTopRightRadius: 10,
              mb: "5px",
              border: "1px solid #ccc",
            }}
          >
            <Iconify icon="icon-park:doc-add" />
            <Typography className="f-w-600 text-muted ml-2 f-italic">
              Staff Enroll Form
            </Typography>
          </Stack>

          <form ref={formRef}>
            <Paper sx={{ p: { md: 5, xs: 3 } }}>
              <StaffEnrollmentForm
                errors={errors}
                processObj={processObj}
                setProcessObj={setProcessObj}
                formRef={formRef}
              />
            </Paper>
            <div className="mt-3">
              <EntityAssignForm
                role={processObj.role}
                handlePopulate={handlePopulate}
              />
            </div>
          </form>

          <div className="mt-3 text-right">
            <LoadingButton
              startIcon={<Iconify icon="clarity:cursor-hand-click-line" />}
              loading={false}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </LoadingButton>
          </div>
        </Grid2>
      </Grid2>
    </>
  );
}
