import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../Navbar/Navbar";

export default function Profile() {
  const [currState, setCurrState] = React.useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrState(event.target.value);
  };
  const states = ["TX", "AL", "AK"];
  //   states.map(option => {
  //       console.log(option)
  //   })
  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="sm">
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
            Initial Profile Setup
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  variant="standard"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  label="Address Line 1"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  variant="standard"
                  fullWidth
                  name="password"
                  label="Address Line 2"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  select
                  color="secondary"
                  name="State"
                  label="State"
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  value={currState}
                  sx={{
                    minWidth: 80,
                    maxWidth: 80
                  }}
                  autoFocus
                >
                  {states.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                     color="secondary"
                     variant="standard"
                     autoComplete="given-name"
                     name="firstName"
                     required
                     fullWidth
                     id="firstName"
                     label="City"
                     autoFocus
                 /> 
              </Grid>
              <Grid item xs={4}>
                <TextField
                     color="secondary"
                     variant="standard"
                     autoComplete="given-name"
                     name="firstName"
                     required
                     fullWidth
                     id="firstName"
                     label="Zip Code"
                     autoFocus
                 /> 
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
