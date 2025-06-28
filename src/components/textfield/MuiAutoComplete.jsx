import { InputLabel } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function MuiAutoComplete(props) {
  const {
    error,
    options,
    placeholder,
    helperText,
    label,
    required = true,
    onChange,
    value,
    autoProps
  } = props;

  return (
    <>
      <InputLabel error={!!error} className="mb-2">
        {label} <span className="c-red">{required ? "*" : ""}</span>
      </InputLabel>
      <Autocomplete
        options={options || []}
        size="small"
        freeSolo
        onChange={onChange}
        value={value}
        {...autoProps}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            helperText={helperText}
          />
        )}
      />
    </>
  );
}
