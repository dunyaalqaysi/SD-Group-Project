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
import { ThemeProvider } from "@mui/material/styles";
import { endpoint_url, theme } from "src/constants";



export default function Login() {
  const [emailState, setEmailState] = React.useState("");
  const [errors, setErrors] = React.useState({ email: null, password: null });
  const nav_to = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch(`${endpoint_url}`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) return;
        return res.json();
      })
      .then((data) => {
        if (!data) {
          console.log("Signed in succesfully.");
          nav_to("/profile", { replace: true });
          return
        }
        for (const err in data) {
          setErrors((prev_errors: any) => ({
            ...prev_errors,
            [err]: data[err][0],
          }));
        }
        console.log(data);
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
              required
              error={errors.email !== null ? true : false}
              fullWidth
              id="email"
              label="Email Address"
              placeholder="Ex: laquer@gmail.com"
              name="email"
              helperText={errors.email !== null ? errors.email : ""}
              value={emailState}
              onChange={(e) => {
                setEmailState(e.target.value);
                if(errors.email !== null)
                  setErrors({ email: null, password: errors.password });
              }}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error={errors.password !== null ? true : false}
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText={errors.password !== null ? errors.password : ""}
              onChange={() => {
                if(errors.password !== null)
                  setErrors({ email: errors.email, password: null });
              }}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
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
