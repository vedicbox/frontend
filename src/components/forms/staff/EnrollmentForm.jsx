import {
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CityAutoField from "components/autocomplete/CityAutoField";
import CountryAutoField from "components/autocomplete/CountryAutoField";
import StateAutoField from "components/autocomplete/StateAutoField";
import MuiDatePicker from "components/mui/MuiDateField";
import MuiTextField from "components/mui/MuiTextField";
import { HELPER_TXT_MSG } from "values/messages";

export default function StaffEnrollmentForm(props) {
  const { errors, processObj, setProcessObj } = props;

  const handleProcessObj = (keyObj) => {
    setProcessObj({
      ...processObj,
      ...keyObj,
    });
  };

  const handleMultipleUpdate = (obj) => {
    handleProcessObj(obj);
  };

  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <MuiTextField
            label="First Name"
            required={true}
            error={errors["firstName"]}
            textProps={{
              name: "firstName",
            }}
            helperText={HELPER_TXT_MSG.defaultText}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <MuiTextField
            label="Last Name"
            name="lastName"
            error={errors["lastName"]}
            textProps={{
              name: "lastName",
            }}
            helperText={HELPER_TXT_MSG.defaultText}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <MuiTextField
            label="Phone No"
            required={true}
            error={errors["phoneNo"]}
            textProps={{
              name: "phoneNo",
            }}
            helperText={HELPER_TXT_MSG.defaultText}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <MuiTextField
            label="Whatsapp No"
            required={true}
            error={errors["whatsappNo"]}
            textProps={{
              name: "whatsappNo",
            }}
            helperText={HELPER_TXT_MSG.defaultText}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <MuiTextField
            label=" Email Address"
            required={true}
            error={errors["email"]}
            textProps={{
              name: "email",
            }}
            helperText={HELPER_TXT_MSG.defaultText}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <InputLabel className="mb-2">
            Gender <span className="c-red">*</span>
          </InputLabel>
          <Select
            size="small"
            fullWidth
            name="gender"
            onChange={(e) => handleProcessObj({ ["gender"]: e.target.value })}
            value={processObj["gender"] || ""}
            error={"gender" in errors}
          >
            <MenuItem value="">Please Select</MenuItem>
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
            <MenuItem value="O">Other</MenuItem>
          </Select>
          <FormHelperText>
            {errors["gender"] ? errors["gender"] : HELPER_TXT_MSG.defaultText}
          </FormHelperText>
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <MuiDatePicker
            label="Date Of Birth"
            helperText={HELPER_TXT_MSG.defaultText}
            handleProcessObj={handleProcessObj}
            name="dob"
            value={processObj["dob"]}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <CountryAutoField
            name="country"
            error={errors["country"]}
            selectedVal={processObj["country"]}
            onChange={handleMultipleUpdate}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <StateAutoField
            name="state"
            error={errors["state"]}
            country={processObj["country"]}
            selectedVal={processObj["state"]}
            onChange={handleMultipleUpdate}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <CityAutoField
            name="city"
            error={errors["city"]}
            state={processObj["state"]}
            country={processObj["country"]}
            selectedVal={processObj["city"]}
            onChange={handleMultipleUpdate}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <MuiTextField
            label="Pincode"
            required={true}
            error={errors["pincode"]}
            textProps={{
              name: "pincode",
            }}
            helperText={HELPER_TXT_MSG.defaultText}
          />
        </Grid2>
        <Grid2 size={12}>
          <MuiTextField
            label="Address"
            required={true}
            error={errors["address"]}
            textProps={{
              name: "address",
              rows: 2,
              multiline: true,
            }}
            helperText={HELPER_TXT_MSG.defaultText}
          />
        </Grid2>
      </Grid2>
    </>
  );
}
