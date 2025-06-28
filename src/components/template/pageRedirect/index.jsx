import { IconButton, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "components/icons/Iconify";
import ClassicMenu from "components/menu/ClassicMenu";
import ClassicTable from "components/table/classic";
import ClassicMobileView from "components/table/mobileView";
import { useNavigate } from "react-router-dom";

export default function PageRedirectTemplate(props) {
  const {
    header,
    rows,
    actionList,
    placeholderDetails = {},
  } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAction = (itemObj) => {
    if (itemObj.link) {
      navigate(itemObj.link?.pathname, { state: itemObj.link?.stateDat });
    } else if (itemObj.handler) {
      itemObj.handler();
    }
  };

  const renderActionBox = (row) => (
   actionList && <ClassicMenu menulist={actionList(row)}>
      <IconButton size="small">
        <Iconify icon="iconamoon:menu-kebab-vertical-circle-light" />
      </IconButton>
    </ClassicMenu>
  );

  const renderMobileActionBox = (row) => (
   actionList && <Stack direction="row" justifyContent="flex-end">
      {actionList(row).map((itemObj) => (
        <IconButton key={itemObj.icon} onClick={() => handleAction(itemObj)}>
          <Iconify icon={itemObj.icon} />
        </IconButton>
      ))}
    </Stack>
  );

  return (
    <>
      <div className="mt-3">
        {isMobile? (
          <ClassicMobileView
            headers={header}
            rows={rows}
            actionContainer={renderMobileActionBox}
          />
        ) : (
          <ClassicTable
            headers={header}
            rows={rows}
            isFetching={false}
            actionContainer={renderActionBox}
            placeholder={placeholderDetails}
          />
        )}
      </div>
    </>
  );
}
