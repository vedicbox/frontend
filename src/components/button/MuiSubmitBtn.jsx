import { LoadingButton } from "@mui/lab";
import Iconify from "components/icons/Iconify";

export default function MuiSubmitBtn({ onSubmit, isLoading }) {
  return (
    <div className="text-right">
      <LoadingButton
        onClick={onSubmit}
        variant="contained"
        startIcon={<Iconify icon="tabler:hand-click" />}
        loading={isLoading}
      >
        Submit
      </LoadingButton>
    </div>
  );
}
