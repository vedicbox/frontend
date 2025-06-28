import {
    Autocomplete,
    InputLabel,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Iconify from "components/icons/Iconify";
import { useEffect } from "react";
import { useFetchRoleNamesQuery } from "service/auth/roleService";

export default function EntityAssignForm(props) {
  const { handlePopulate, role } = props;

  const { data: roleData } = useFetchRoleNamesQuery();

  let roles = roleData?.payload || [];

  useEffect(() => {
    if (typeof role == "string") {
      let roleObj = roles.find((el) => el._id == role);
      if (roleObj) handlePopulate("role", roleObj);
    }
  }, [roleData]);

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
          Assign Entity
        </Typography>
      </Stack>
      <Paper className="px-5 pt-2 pb-5">
        <div className="mt-3">
          <InputLabel className="mb-2">Assign Role</InputLabel>
          <Autocomplete
            disablePortal
            options={roles}
            getOptionLabel={(option) => option.name || ""}
            value={role || ""}
            fullWidth
            onChange={(e, newVal) => handlePopulate("role", newVal)}
            size="small"
            renderInput={(params) => (
              <TextField placeholder="Select Role" {...params} />
            )}
          />
        </div>
      </Paper>
    </>
  );
}
