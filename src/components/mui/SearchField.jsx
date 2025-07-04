import { LoadingButton } from "@mui/lab";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Iconify from "components/icons/Iconify";
import { useRef } from "react";

export default function SearchField(props) {
  const { handleSearch, formRef, isLoading, placeholder } = props;
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleSearch) {
      handleSearch(inputRef.current.value);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
        <InputBase
          sx={{ pl: 2, flex: 1 }}
          name="searchValue"
          placeholder={placeholder}
          inputRef={inputRef}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <LoadingButton
          size="small"
          variant="outlined"
          startIcon={<Iconify icon="majesticons:search" />}
          className="ml-2"
          type="submit"
          loading={isLoading}
        >
          Search
        </LoadingButton>
      </Paper>
    </form>
  );
}