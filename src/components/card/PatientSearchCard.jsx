import { IconButton, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Iconify from "components/icons/Iconify";
import { NavLink } from "react-router-dom";
import { PARAMS_ROUTE, PATIENT_ROUTE } from "routes/routeurl";
import { GENDER_PARSER } from "values/enum";
import { AVATAR_IMG } from "values/img-links";

export default function PatientSearchCard({ itemObj }) {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        className="p-0"
        secondaryAction={
          <IconButton
            component={NavLink}
            to={`/${PARAMS_ROUTE.PATIENT}/${itemObj.caseId}/${PATIENT_ROUTE.CONSULT}`}
            edge="end"
            aria-label="comments"
          >
            <Iconify icon="clarity:cursor-hand-click-line" />
          </IconButton>
        }
      >
        <ListItemAvatar className="mr-2">
          <Avatar
            src={GENDER_PARSER[itemObj.gender]?.src || AVATAR_IMG.OTHER}
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={itemObj.patientName}
          secondary={
            <Stack direction="row">
              <Iconify icon="ri:phone-line" />
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "inline" }}
                className="ml-2"
              >
                {itemObj.phone1}
              </Typography>
             
            </Stack>
          }
        />
      </ListItem>
    </>
  );
}
