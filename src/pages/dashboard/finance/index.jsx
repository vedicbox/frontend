import { Grid2 } from "@mui/material";
import ShadeCard from "components/card/ShadeCard";

export default function FinancePage() {
  return (
    <>
      <div className="p-relative">
        <Grid2 container>
          <Grid2 item size={6}>
            <ShadeCard />
          </Grid2>
        </Grid2>
      </div>
    </>
  );
}
