import { Paper } from "@mui/material";
import PatientSearchCard from "components/card/PatientSearchCard";
import DisplayContent from "components/placeholder/DisplayContent";
import ImgReplacer from "components/placeholder/ImgReplacer";
import SearchField from "components/textfield/SearchField";
import { useRef, useState } from "react";
import { useLazySearchPatientQuery } from "service/patientService";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const imgDetails = {
  src: PLACEHOLDER_IMG.SEARCH_PATIENT,
  heading: PLACEHOLDER_MSG.SEARCH_PATIENT,
};

export default function ViewPage() {
  const searchFormRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const [searchPatients, { data, isLoading }] = useLazySearchPatientQuery();

  const handleSearch = (searchVal) => {
    if (searchVal) {
      searchPatients({ searchVal });
      setIsEmpty(false);
    } else {
      alert("Please provide valid search parameters.");
      setIsEmpty(true);
    }
  };

  return (
    <>
      <SearchField
        placeholder="Enter Phone No..."
        formRef={searchFormRef}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />

      <div className="mt-3">
        <DisplayContent
          valid1={data?.payload?.length > 0 && !isEmpty}
          content={
            <Paper className="py-5 px-4" variant="outlined">
              <ImgReplacer {...imgDetails} />
            </Paper>
          }
        >
          {data?.payload?.map((itemObj) => (
            <div key={itemObj.caseId} className="mb-3">
              <PatientSearchCard itemObj={itemObj} />
            </div>
          ))}
        </DisplayContent>
      </div>
    </>
  );
}
