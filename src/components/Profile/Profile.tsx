import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../Navbar/Navbar";
import { endpoint_url, states } from "src/constants";

export default function Profile() {
  const [currState, setCurrState] = React.useState("");
  const [errors, setErrors] = React.useState<any>({
    fullName: null,
    add1: null,
    add2: null,
    state: null,
    city: null,
    zipCode: null,
  });
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch(`${endpoint_url}/profile`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(res.body);
        if (res.status === 200) return;
        const errs = res.json();
        return errs;
      })
      .then((data) => {
        if (!data) {
          console.log("Posted successfully.");
          return;
        }
        console.log(data);
        for (const err in data)
          setErrors((prev_errors: any) => ({
            ...prev_errors,
            [err]: data[err][0],
          }));
      });
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrState(event.target.value);
    if(errors.state !== null)
      setErrors({ ...errors, state: null });
  };
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
            Let's manage your profile.
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
                  name="fullName"
                  error={(errors.fullName !== null) ? true : false}
                  helperText={(errors.fullName !== null) ? errors.fullName : ""}
                  required
                  fullWidth
                  onChange={() => {
                    if(errors.fullName !== null)
                      setErrors({...errors, fullName: null });
                  }}
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
                  id="add1"
                  label="Address Line 1"
                  name="add1"
                  error={(errors.add1 !== null) ? true : false}
                  helperText={(errors.add1 !== null) ? errors.add1 : ""}
                  onChange={() => {
                    if(errors.add1 !== null)
                      setErrors({ ...errors, add1: null });
                  }}
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  variant="standard"
                  error={(errors.add2 !== null) ? true : false}
                  helperText={(errors.add2 !== null) ? errors.add2 : ""}
                  onChange={() => {
                    if(errors.add2 !== null)
                      setErrors({ ...errors, add2: null });
                  }}
                  fullWidth
                  name="add2"
                  label="Address Line 2"
                  id="add2"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  select
                  color="secondary"
                  name="state"
                  label="State"
                  error={(errors.state !== null) ? true : false}
                  helperText={(errors.state !== null) ? errors.state : ""}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  value={currState}
                  sx={{
                    minWidth: 55,
                    maxWidth: 80,
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
                  name="city"
                  error={(errors.city !== null) ? true : false}
                  helperText={(errors.city !== null) ? errors.city : ""}
                  onChange={() => {
                    if(errors.city !== null)
                      setErrors({ ...errors, city: null });
                  }}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  autoFocus
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  color="secondary"
                  variant="standard"
                  name="zipCode"
                  error={(errors.zipCode !== null) ? true : false}
                  helperText={(errors.zipCode !== null)? errors.zipCode : ""}
                  onChange={() => {
                    if(errors.zipCode !== null)
                      setErrors({ ...errors, zipCode: null });
                  }}
                  required
                  fullWidth
                  id="zip"
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
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
