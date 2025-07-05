import { InputLabel, MenuItem, Select } from "@mui/material";
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
      <MuiTextField
        label="Role Name"
        required={true}
        //  error={errors["firstName"]}
        textProps={{
          name: "roleName",
          placeholder: "e.g. DOCTOR",
        }}
        helperText={HELPER_TXT_MSG.defaultText}
      />

      <div className="mt-2">
        <InputLabel>
          Status <span className="c-red">*</span>
        </InputLabel>
        <Select
          name="isActive"
          fullWidth
          defaultValue={Number(defaultData?.isActive) || 1}
        >
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">InActive</MenuItem>
        </Select>
      </div>
    </form>
  );
}
