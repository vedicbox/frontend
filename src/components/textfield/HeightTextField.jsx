import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

export default function HeightTextField(props) {
  const { ftVal, inchVal, helperText, error, handleStateChange } = props;
  return (
    <>
      <Stack direction="row" spacing={1}>
        <div style={{ width: "100%" }}>
          <InputLabel className="mb-2">
            Feet <span className="c-red">*</span>
          </InputLabel>
          <Select
            value={ftVal || ""}
            onChange={(e) => handleStateChange("feet", e.target.value)}
            fullWidth
            size="small"
          >
            {[...Array(8).keys()].map((ft) => (
              <MenuItem key={ft} value={ft}>
                {ft}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div style={{ width: "100%" }}>
          <InputLabel className="mb-2">
            Inch <span className="c-red">*</span>
          </InputLabel>
          <Select
            value={inchVal || ""}
            onChange={(e) => handleStateChange("inch", e.target.value)}
            fullWidth
            size="small"
          >
            {[...Array(12).keys()].map((inch) => (
              <MenuItem key={inch} value={inch}>
                {inch}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Stack>
      <FormHelperText error={!!error}>
        {error ? error : helperText}
      </FormHelperText>
    </>
  );
}
