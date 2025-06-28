import { LoadingButton } from "@mui/lab";
import { Grid2, Paper, Stack, Typography } from "@mui/material";
import StaffEnrollmentForm from "components/forms/staff/EnrollmentForm";
import EntityAssignForm from "components/forms/staff/EntityAssignForm";
import Iconify from "components/icons/Iconify";
import DisplayContent from "components/placeholder/DisplayContent";
import { useEffect, useRef, useState } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useEditStaffQuery,
  useUpdateStaffMutation,
} from "service/staffService";
import { convertNestedToPlainObj, parsePicker } from "utils/parse";
import { validateAll } from "utils/validation";
import { HTTP_STATUS_CODES } from "values/enum";

const rules = [];

export default function EditStaff() {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [processObj, setProcessObj] = useState({});
  const { staffId, userId } = useLocation()?.state || {};

  const navigate = useNavigate();

  const { data: profData } = useEditStaffQuery({ staffId: staffId });

  const [updateStaffMutation] = useUpdateStaffMutation();

  const profDefaultData = profData?.payload || {};

  useEffect(() => {
    if (profDefaultData?._id) initDefaultData();
  }, [profDefaultData]);

  const initDefaultData = async () => {
    const parseObj = convertNestedToPlainObj(profDefaultData);

    // Iterate over the entries of the flat default data
    Object.entries(parseObj).forEach(([key, value]) => {
      // Find the input element by name
      const inputElement = formRef.current.elements[key];
      if (inputElement) {
        // Set the value of the input element
        inputElement.value = value;
      }
    });

    let locationObj = {};

    setProcessObj({
      gender: parseObj["gender"],
      role: profDefaultData.userRef?.roleRef?._id,
      dob: parseObj["dob"],
    });

    try {
      // Fetch the country data
      const countries = await GetCountries();
      let countryObj = countries.find((v) => v.name === parseObj["country"]);
      if (countryObj) {
        locationObj["country"] = countryObj;

        // Fetch the state data
        const statelist = await GetState(countryObj.id);
        let stateObj = statelist.find((v) => v.name === parseObj["state"]);
        if (stateObj) {
          locationObj["state"] = stateObj;

          // Fetch the city data
          const citylist = await GetCity(countryObj.id, stateObj.id);
          let cityObj = citylist.find((v) => v.name === parseObj["city"]);
          if (cityObj) {
            locationObj["city"] = cityObj;
          }
        }
      }

      // Set the final processed object
      setProcessObj((prev) => ({
        ...prev,
        ...locationObj,
      }));
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleSubmit = () => {
    const formData = Object.fromEntries(new FormData(formRef.current));
    formData["userId"] = profDefaultData.userRef?._id;
    formData["staffId"] = profDefaultData._id;
    formData["roleId"] = processObj["role"]?._id;
    formData["dob"] = parsePicker(processObj.dob, "date");

    validateAll(rules, formData)
      .then(async (success) => {
        if (success) {
          let { data, error } = await updateStaffMutation(formData);

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
      <Grid2 container justifyContent="center">
        <Grid2 size={10}>
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
            <Iconify icon="icon-park:update-rotation" />
            <Typography className="f-w-600 text-muted ml-2 f-italic">
              Staff enroll form
            </Typography>
          </Stack>

          <form ref={formRef}>
            <Paper className="p-5">
              <StaffEnrollmentForm
                errors={errors}
                processObj={processObj}
                setProcessObj={setProcessObj}
              />
            </Paper>
          </form>
          <DisplayContent valid1={processObj.role != undefined}>
            <div className="mt-3">
              <EntityAssignForm
                role={processObj.role}
                handlePopulate={handlePopulate}
              />
            </div>
          </DisplayContent>

          <div className="mt-3 text-right">
            <LoadingButton
              startIcon={<Iconify icon="clarity:cursor-hand-click-line" />}
              loading={false}
              variant="contained"
              onClick={handleSubmit}
            >
              Update
            </LoadingButton>
          </div>
        </Grid2>
      </Grid2>
    </>
  );
}
