import { Grid2, Paper, Stack, Typography } from "@mui/material";
import CityAutoField from "components/autocomplete/CityAutoField";
import CountryAutoField from "components/autocomplete/CountryAutoField";
import StateAutoField from "components/autocomplete/StateAutoField";
import Iconify from "components/icons/Iconify";
import MuiTextField from "components/textfield/MuiTextField";
import { HELPER_TXT_MSG } from "values/messages";

const rules = {
  firstName: { required: true },
  lastName: { required: true },
  dob: { required: true },
  age: { required: true },
  weight: { required: true },
  heightFeet: { required: true },
  gender: { required: true },
  email: { required: true },
  source: { required: true },
  occupation: { required: true },
  patientCategory: { required: true },
  phone1: { required: true },
  whatsappNo: { required: true },
  addr1: { required: true },
  cityId: { required: true },
  stateId: { required: true },
  pincode: { required: true },
  countryId: { required: true },
};

export default function PatientAddressForm(props) {
  const { errors, setErrors, processObj, handleProcessObj } = props;

  const handleMultipleUpdate = (obj) => {
    handleProcessObj(obj);
  };

  return (
    <>
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
        <Iconify icon="flat-color-icons:address-book" />
        <Typography className="f-w-600 text-muted ml-2 f-italic">
          Address Information
        </Typography>
      </Stack>

      <Paper className="p-4 mb-3">
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <CountryAutoField
              name="country"
              error={errors["country"]}
              selectedVal={processObj["country"]}
              onChange={handleMultipleUpdate}
            />
          </Grid2>

          <Grid2 size={6}>
            <StateAutoField
              name="state"
              error={errors["state"]}
              country={processObj["country"]}
              selectedVal={processObj["state"]}
              onChange={handleMultipleUpdate}
            />
          </Grid2>
          <Grid2 size={6}>
            <CityAutoField
              name="city"
              error={errors["city"]}
              state={processObj["state"]}
              country={processObj["country"]}
              selectedVal={processObj["city"]}
              onChange={handleMultipleUpdate}
            />
          </Grid2>
          <Grid2 size={6}>
            <div className="mb-2">
              <MuiTextField
                label="Pincode"
                required={true}
                error={errors["pincode"]}
                textProps={{
                  name: "pincode",
                }}
                helperText={HELPER_TXT_MSG.defaultText}
              />
            </div>
          </Grid2>
          <Grid2 size={12}>
            <div className="mb-2">
              <MuiTextField
                label="Address 1"
                error={errors.address}
                textProps={{
                  name: "addr1",
                  multiline: true,
                  rows: 2,
                }}
                helperText={HELPER_TXT_MSG.defaultText}
              />
            </div>
          </Grid2>
          <Grid2 size={12}>
            <div className="mb-2">
              <MuiTextField
                label="Address 2"
                required={false}
                error={errors.address}
                textProps={{
                  name: "addr2",
                  multiline: true,
                  rows: 2,
                }}
                helperText={HELPER_TXT_MSG.defaultText}
              />
            </div>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
}
