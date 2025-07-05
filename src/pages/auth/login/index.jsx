import { debounce, Grid2 as Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useSignInMutation } from "service/auth/authService";
import { validateAll, validatefield } from "utils/validation";
import AuthWrapper from "../AuthWrapper";
import LoginForm from "../forms/LoginForm";

const rules = {
  email: {
    required: true,
    email: true,
    msgVariable: { email: "user@gmail.com" },
  },
  org: { required: true },
  password: { required: true, minlength: 6 },
};

export default function LoginPage() {
  // States
  const [errors, setErrors] = useState({});

  // Hooks
  const signinFormRef = useRef(null);

  // Service Call
  const [signInMutation] = useSignInMutation();

  // Bussiness Login
  const onChange = debounce((e) => {
    const { name, value } = e.target;

    if (name in errors) {
      const validate = validatefield(rules[name], value);

      if (!validate.status) {
        delete errors[name];
        setErrors({ ...errors });
      }
    }
  }, 1200);

  const onBlur = (e) => {
    const { name, value } = e.target;
    if (value == "") return;
    const validate = validatefield(rules[name], value);
    if (validate.status) {
      errors[name] = validate.msg;
      setErrors({ ...errors });
    }
  };

  const handleAuthentication = (e) => {
    e.preventDefault();

    const credentials = Object.fromEntries(new FormData(signinFormRef.current));

    validateAll(rules, credentials)
      .then((success) => {
        if (success) {
          signInMutation(credentials);
        }
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  return (
    <>
      <AuthWrapper>
        <Grid
          container
          sx={{ minHeight: "80vh" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography variant="h4">Sign in</Typography>
            <Typography className="mb-4" color="text.secondary" variant="body2">
              Don&apos;t have an account?{" "}
            </Typography>

            <LoginForm
              handleAuthentication={handleAuthentication}
              onBlur={onBlur}
              onChange={onChange}
              errors={errors}
              innerRef={signinFormRef}
            />
          </Grid>
        </Grid>
      </AuthWrapper>
    </>
  );
}
