import { LoadingButton } from "@mui/lab";
import { Box, IconButton, InputAdornment } from "@mui/material";
import Iconify from "components/icons/Iconify";
import MuiOutlinedField from "components/mui/MuiOutlinedField";
import MuiTextField from "components/mui/MuiTextField";
import { useState } from "react";
import { HELPER_TXT_MSG } from "values/messages";

// ============================|| FIREBASE - LOGIN ||============================ //

const LoginForm = (props) => {
  // Props
  const {
    handleAuthentication,
    errors,
    isLoading,
    innerRef,
    onChange,
    onBlur,
  } = props;

  // States
  const [showPassword, setShowPassword] = useState(false);

  // Bussiness Login
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form noValidate ref={innerRef}>
        <div className="mb-4">
          <MuiTextField
            label="Organization"
            error={errors["org"]}
            helperText={HELPER_TXT_MSG.defaultText}
            textProps={{
              name: "org",
              size: "medium",
              onChange,
              onBlur,
            }}
          />
        </div>
        <div className="mb-4">
          <MuiTextField
            label="Email Address"
            error={errors["email"]}
            helperText={HELPER_TXT_MSG.defaultText}
            textProps={{
              name: "email",
              placeholder: "user@gmail.com",
              size: "medium",
              onChange,
              onBlur,
            }}
          />
        </div>

        <div className="mb-4">
          <MuiOutlinedField
            label="Password"
            error={errors["password"]}
            helperText={HELPER_TXT_MSG.defaultText}
            textProps={{
              name: "password",
              placeholder: "******",
              type: showPassword ? "text" : "password",
              onChange,
              onBlur,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? (
                      <Iconify icon="majesticons:eye-off-line" />
                    ) : (
                      <Iconify icon="ion:eye-outline" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              size: "medium",
            }}
          />
        </div>

        <Box sx={{ mt: 2 }}>
          <LoadingButton
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleAuthentication}
            loading={isLoading}
          >
            Sign in
          </LoadingButton>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
