import { Grid2 } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import PatientAddressForm from "components/forms/patients/enroll/AddressDetails";
import PatientContactForm from "components/forms/patients/enroll/ContactDetails";
import PatientDetailsForm from "components/forms/patients/enroll/PatientDetails";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnrollPatientMutation } from "service/patientService";
import { HTTP_STATUS_CODES } from "values/enum";

export default function PatientEnroll() {
  const [errors, setErrors] = useState({});
  const [processObj, setProcessObj] = useState({});
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [enrollPatientEndPoint, { isLoading }] = useEnrollPatientMutation();

  const handleSubmit = async () => {
    let formData = Object.fromEntries(new FormData(formRef.current));

    formData["dob"] = processObj.dob;
    formData["height"] = `${processObj.feet}.${processObj.inch}`;

    let { data, error } = await enrollPatientEndPoint(formData);

    if (data?.status == HTTP_STATUS_CODES.OK) {
      navigate(-2);
    } else if (error.data?.payload) {
      setErrors({ ...error.data?.payload });
    }
  };

  const handleProcessObj = (keyObj) => {
    setProcessObj({
      ...processObj,
      ...keyObj,
    });
  };

  return (
    <>
    <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.PATIENTS.ENROLL} />

      <Grid2 container justifyContent="center">
        <Grid2 size={10}>
          <form ref={formRef}>
            <PatientDetailsForm
              errors={errors}
              setErrors={setErrors}
              processObj={processObj}
              handleProcessObj={handleProcessObj}
            />
            <PatientContactForm errors={errors} setErrors={setErrors} />
            <PatientAddressForm
              errors={errors}
              setErrors={setErrors}
              processObj={processObj}
              handleProcessObj={handleProcessObj}
            />
          </form>
          <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
        </Grid2>
      </Grid2>
    </>
  );
}
