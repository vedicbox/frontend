import { LoadingButton } from "@mui/lab";
import { Box, IconButton, InputAdornment } from "@mui/material";
import Iconify from "components/icons/Iconify";
import MuiOutlinedField from "components/mui/MuiOutlinedField";
import MuiTextField from "components/mui/MuiTextField";
import { useState } from "react";

// ============================|| FIREBASE - LOGIN ||============================ //

const LoginForm = (props) => {
  // Props
  const {
    handleAuthentication,
    onChange,
    onBlur,
    errors,
    isLoading,
    innerRef,
  } = props;

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

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
            label="Email Address"
            error={errors["email"]}
            textProps={{
              name: "email",
              placeholder: "user@gmail.com",
              size: "medium",
            }}
          />
        </div>

        <div className="mb-4">
          <MuiOutlinedField
            label="Password"
            error={errors["password"]}
            textProps={{
              name: "password",
              placeholder: "******",
              type: showPassword ? "text" : "password",
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
