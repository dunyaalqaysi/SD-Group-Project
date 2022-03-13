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
import { endpoint_url } from "src/constants";

export default function Profile() {
  const [currState, setCurrState] = React.useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch(`${endpoint_url}/profile`, 
    {
      method: "POST",
      body: data
    }
    )
    .then( (res) => {
      return res.json()
    })
    .then( (data) => {
        console.log(data)
    })
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
  const states = [
    'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
    'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
    'VT','VI','VA','WA','WV','WI','WY'
   ];
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
                  name="fullName"
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
                  id="add1"
                  label="Address Line 1"
                  name="add1"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  variant="standard"
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
                     name="city"
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
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
