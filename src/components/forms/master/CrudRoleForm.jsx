import { FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import MuiTextField from "components/mui/MuiTextField";
import { useEffect } from "react";
import { HELPER_TXT_MSG } from "values/messages";

export default function CrudRoleForm(props) {
  const { defaultData, formRef } = props;

  useEffect(() => {
    if (defaultData) {
      formRef.current.name.value = defaultData?.name || "";
    }
  }, [defaultData]);

  return (
    <form
      ref={formRef}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div>
        <MuiTextField
          label="Role Name"
          required={true}
          textProps={{
            name: "name",
            placeholder: "e.g. DOCTOR",
            size: "medium",
          }}
          helperText={HELPER_TXT_MSG.defaultText}
        />
      </div>

      <div className="mt-2">
        <InputLabel className="mb-2">
          Status <span className="c-red">*</span>
        </InputLabel>
        <Select
          name="status"
          fullWidth
          defaultValue={Number(defaultData?.isActive) || 1}
        >
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">InActive</MenuItem>
        </Select>
        <FormHelperText>{HELPER_TXT_MSG.defaultText}</FormHelperText>
      </div>
    </form>
  );
}
