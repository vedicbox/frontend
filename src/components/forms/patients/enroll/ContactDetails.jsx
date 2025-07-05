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
import MuiTextField from "components/mui/MuiTextField";
import { HELPER_TXT_MSG } from "values/messages";

export default function PatientContactForm(props) {
  const { children } = props;

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
        <Iconify icon="flat-color-icons:contacts" />
        <Typography className="f-w-600 text-muted ml-2 f-italic">
          Contact Details
        </Typography>
      </Stack>

      <Paper className="p-4 mb-3">
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <div className="mb-2">
              <MuiTextField
                label="Email Address"
                textProps={{
                  name: "email",
                }}
                helperText={HELPER_TXT_MSG.defaultText}
              />
            </div>
          </Grid2>
          <Grid2 size={6}>
            <div className="mb-2">
              <MuiTextField
                label="Phone No"
                textProps={{
                  name: "phone1",
                }}
                helperText={HELPER_TXT_MSG.defaultText}
              />
            </div>
          </Grid2>
          <Grid2 size={6}>
            <div className="mb-2">
              <MuiTextField
                label=" Alternate Number"
                required={false}
                textProps={{
                  name: "phone2",
                }}
                helperText={HELPER_TXT_MSG.defaultText}
              />
            </div>
          </Grid2>
          <Grid2 size={6}>
            <div className="mb-2">
              <InputLabel className="mb-2">
                Whatsapp Number <span className="c-red">*</span>
              </InputLabel>
              <Select fullWidth size="small" name="whatsappNo">
                <MenuItem value="0">Phone1</MenuItem>
                <MenuItem value="1">Phone2</MenuItem>
              </Select>
              <FormHelperText>{HELPER_TXT_MSG.defaultText}</FormHelperText>
            </div>
          </Grid2>
        </Grid2>
        {children}
      </Paper>
    </>
  );
}
