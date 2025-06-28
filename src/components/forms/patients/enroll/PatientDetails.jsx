import {
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "components/icons/Iconify";
import HeightTextField from "components/textfield/HeightTextField";
import MuiDatePicker from "components/textfield/MuiDateField";
import MuiTextField from "components/textfield/MuiTextField";
import { HELPER_TXT_MSG } from "values/messages";

function PatientDetailsForm(props) {
  const { errors, processObj, handleProcessObj } = props;

  const handleStateChange = (name, value) => {
    handleProcessObj({ [name]: value });
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
        <Iconify icon="fluent-emoji:information" />
        <Typography className="f-w-600 text-muted ml-2 f-italic">
          Personal Details
        </Typography>
      </Stack>
      <Paper className="p-4 mb-3">
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <div className="mb-2">
              <MuiTextField
                label="First Name"
                required={true}
                error={errors.firstName}
                textProps={{
                  name: "firstName",
                  placeholder: "Enter First name",
                }}
                helperText={HELPER_TXT_MSG.defaultText}
              />
            </div>
          </Grid2>
          <Grid2 size={6}>
            <div className="mb-2">
              <MuiTextField
                label="Last Name"
                required={true}
                error={errors.lastName}
                textProps={{
                  name: "lastName",
                  placeholder: "Enter Last name",
                }}
                helperText={HELPER_TXT_MSG.defaultText}
              />
            </div>
          </Grid2>
          <Grid2 size={6}>
            <div className="mb-2">
              <MuiDatePicker
                label="Date Of Birth"
                helperText={HELPER_TXT_MSG.defaultText}
                handleProcessObj={handleProcessObj}
                name="dob"
                value={processObj["dob"]}
              />
            </div>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <InputLabel className="mb-2">
              Gender <span className="c-red">*</span>
            </InputLabel>
            <Select
              size="small"
              fullWidth
              onChange={(e) => handleStateChange("gender", e.target.value)}
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
          <Grid2 size={6}>
            <div className="mb-2">
              <HeightTextField
                ftVal={processObj.feet}
                inchVal={processObj.inch}
                helperText={HELPER_TXT_MSG.defaultText}
                handleStateChange={handleStateChange}
              />
            </div>
          </Grid2>
          <Grid2 size={6}>
            <div className="mb-2">
              <MuiTextField
                label="Weight"
                required={true}
                error={errors.weight}
                textProps={{
                  name: "weight",
                }}
                helperText={HELPER_TXT_MSG.defaultText}
              />
            </div>
          </Grid2>
          <Grid2 size={6}>
            <div className="mb-2">
              <MuiTextField
                label="Age"
                required={true}
                error={errors.age}
                textProps={{
                  name: "age",
                }}
                helperText={HELPER_TXT_MSG.defaultText}
              />
            </div>
          </Grid2>

          <Grid2 size={6}>
            <div className="mb-2">
              <InputLabel error={"martial" in errors} className="mb-2">
                Martial Status <span className="c-red">*</span>
              </InputLabel>
              <Select
                fullWidth
                size="small"
                onChange={(e) =>
                  handleStateChange("maritalStatus", e.target.value)
                }
                value={processObj["maritalStatus"] || ""}
              >
                <MenuItem value="">Please Select</MenuItem>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
              </Select>
              <FormHelperText error={"martial" in errors}>
                {errors.martial || HELPER_TXT_MSG.defaultText}
              </FormHelperText>
            </div>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
}

export default PatientDetailsForm;
