import { Grid2, Paper, Typography } from "@mui/material";
import Iconify from "components/icons/Iconify";

export default function PatientSearchCard(props) {
  const { headers, rows, actionContainer } = props;

  const cellReturnContent = (headObj, selectRow) => {
    // Remove the brackets and split the string into parts
    const path = headObj.picker?.split(".");
    const content = path?.reduce((obj, key) => obj && obj[key], selectRow);

    return content;
  };

  return (
    <Grid2 container spacing={2}>
      {rows.map((row) => (
        <Grid2 key={row.id} size={{ xs: 12, lg: 6 }}>
          <Paper className="p-2 py-4 full-br" elevation={4}>
            {headers.map(
              (headCell, index) =>
                !headCell.action && (
                  <Paper
                    key={headCell.label}
                    size={{ xs: 12, ...headCell.dimension }}
                    className="p-2 mb-1"
                    elevation={3}
                  >
                    <div className="d-flex align-items-center ">
                      <span className="mr-2">
                        <Iconify icon="emojione-v1:black-push-pin" />
                      </span>
                      <Typography
                        noWrap
                        className="f-s-15 f-w-600"
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                        }}
                      >
                        {headCell.label} :-
                      </Typography>
                      <Typography noWrap className="ml-3 f-s-14">
                        {cellReturnContent(headCell, row)}
                      </Typography>
                    </div>
                  </Paper>
                )
            )}
          </Paper>
          <Paper className="p-2 full-br" elevation={4}>
            {actionContainer(row)}
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  );
}
