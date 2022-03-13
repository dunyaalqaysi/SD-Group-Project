import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validate from "validate.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { endpoint_url } from "src/constants";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
  },
});
const validate_email = (em: string) => {
  return validate(
    { from: em },
    {
      from: {
        email: true,
      },
    }
  );
};

export default function Login() {
  const [emailState, setEmailState] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("");
  const [validPass, setValidPass] = React.useState(true);
  const nav_to = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password")?.toString().length === 0) {
      setValidPass(false);
      return;
    }
    fetch(`${endpoint_url}`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        nav_to("/profile", { replace: true });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              // required
              error={validate_email(emailState) && emailState.length !== 0}
              fullWidth
              id="email"
              label="Email Address"
              placeholder="Ex: laquer@gmail.com"
              name="email"
              helperText={
                validate_email(emailState) && emailState.length !== 0
                  ? "Please enter a valid email."
                  : ""
              }
              value={emailState}
              onChange={(e) => {
                setEmailState(e.target.value);
              }}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              // required
              fullWidth
              error={!validPass}
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText={
                !validPass ? "Please enter a password that isn't empty." : ""
              }
              onChange={(e) => {
                setPasswordState(e.target.value);
                setValidPass(true);
              }}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              disabled={
                !validate_email(emailState) && passwordState.length > 0
                  ? false
                  : true
              }
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
