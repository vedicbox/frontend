import { Paper } from "@mui/material";
import ClassicListItem from "components/list/RoleListItem";
import { useGetTBRolesQuery } from "service/auth/roleService";

export default function RoleListView() {
  const { data: roleData } = useGetTBRolesQuery();
  let rolePayload = roleData?.payload?.rolelist || [];

  return (
    <Paper variant="outlined">
      {rolePayload.map((itemObj) => (
        <div className="mb-2" key={itemObj._id}>
          <ClassicListItem title={itemObj.name} />
        </div>
      ))}
    </Paper>
  );
}
