import { Grid2, Paper } from "@mui/material";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import ConsultFeeForm from "components/forms/patients/ConsultFeeForm";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlignPatientMutation } from "service/patientService";
import { useStafflistViaRoleQuery } from "service/staffService";
import { HTTP_STATUS_CODES } from "values/enum";

export default function ConsultInitPage() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const assignPatientObJ = useSelector((state) => state.patient.assignObj);
  const authUser = useSelector((state) => state.auth.user);

  const [processObj, setProcessObj] = useState({});

  const [alignPatientMutation, { isLoading }] = useAlignPatientMutation();
  const { data: doclist } = useStafflistViaRoleQuery({
    roleName: "DOCTOR",
  });

  const handleSubmit = async () => {
    let formData = Object.fromEntries(new FormData(formRef.current));

    formData = {
      ...formData,
      payTag: processObj["payMode"]?.tag,
      docId: processObj["assignDoc"]?._id,
      caseId: assignPatientObJ.caseId,
    };

    let { data, error } = await alignPatientMutation(formData);

    if (data?.status == HTTP_STATUS_CODES.OK) {
      navigate(-2);
    } else if (error.data?.payload) {
    }
  };

  return (
    <>
      <Grid2 container justifyContent="center" className="my-5">
        <Grid2 size={{ xs: 12, sm: 6, lg: 5 }}>
          <Paper elevation={3} className="p-4">
            <ConsultFeeForm
              formRef={formRef}
              doclist={doclist?.payload || []}
              processObj={processObj}
              setProcessObj={setProcessObj}
            />
            <div className="mt-4">
              <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
}
