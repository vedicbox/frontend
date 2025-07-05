import { Grid2, Paper } from "@mui/material";
import MuiOutlinedField from "components/mui/MuiOutlinedField";
import DisplayContent from "components/placeholder/DisplayContent";
import ImgReplacer from "components/placeholder/ImgReplacer";
import MuiAutoComplete from "components/mui/MuiAutoComplete";
import { PAYMENT_ENUM } from "values/enum";
import { PLACEHOLDER_IMG } from "values/img-links";
import { HELPER_TXT_MSG } from "values/messages";

const imgDetails = {
  src: PLACEHOLDER_IMG.COLLECT_FEE,
};

export default function ConsultFeeForm(props) {
  const { formRef, doclist, processObj, setProcessObj } = props;

  const handleProcessObj = (key, value) => {
    setProcessObj((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <form ref={formRef}>
      <Grid2 container>
        <Grid2 size={{ xl: 4, xs: 12 }}>
          <Paper
            sx={{
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: 150,
              height: 150,
              mx: "auto",
            }}
            elevation={3}
          >
            <ImgReplacer {...imgDetails} />
          </Paper>
        </Grid2>
        <Grid2 size={{ xl: 8, xs: 12 }}>
          <div className="mt-2">
            <MuiOutlinedField
              label="Consultation Fee"
              textProps={{
                name: "fee",
                placeholder: "XXXXX",
              }}
              helperText={HELPER_TXT_MSG.defaultText}
            />
          </div>
          <div className="mt-3">
            <MuiAutoComplete
              label="Payment Mode"
              options={PAYMENT_ENUM}
              onChange={(e, newVal) => handleProcessObj("payMode", newVal)}
              value={processObj["payMode"] || ""}
              placeholder="Select Pay Mode"
              autoProps={{
                getOptionLabel: (option) => option.method || "",
              }}
              helperText={HELPER_TXT_MSG.defaultText}
            />
          </div>
        </Grid2>
      </Grid2>

      <DisplayContent
        valid1={processObj["payMode"] && processObj["payMode"]?.tag !== "cash"}
      >
        <div className="mt-3">
          <MuiOutlinedField
            label="Transaction Id"
            textProps={{
              name: "transId",
              placeholder: "Transaction Id",
            }}
            helperText={HELPER_TXT_MSG.defaultText}
          />
        </div>
      </DisplayContent>

      <div className="mt-3">
        <MuiAutoComplete
          label="Assign Doctor"
          options={doclist}
          onChange={(e, newVal) => handleProcessObj("assignDoc", newVal)}
          value={processObj["assignDoc"] || ""}
          placeholder="Select Pay Mode"
          autoProps={{
            getOptionLabel: (option) => option.name || "",
          }}
          helperText={HELPER_TXT_MSG.defaultText}
        />
      </div>
    </form>
  );
}
