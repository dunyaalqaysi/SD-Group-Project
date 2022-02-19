import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from '@mui/material/Link';
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../Navbar/Navbar";

export default function Quote() {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
            Let's see how much your quote is...
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  color="secondary"
                  variant="standard"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Gallons Requested"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField
                  color="secondary"
                  variant="standard"
                  disabled={true}
                  value={"3030 Bay Dr, Houston, TX, 77077"}
                  fullWidth
                  id="email"
                  label="Address Line 1"
                  name="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  variant="standard"
                  disabled={true}
                  fullWidth
                  value="Apt. 123"
                  label="Address Line 2"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disablePast
                    label="Date"
                    // maxDate="01/01/2024"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {/* <TextField
                     color="secondary"
                     variant="standard"
                     autoComplete="given-name"
                     name="firstName"
                     required
                     fullWidth
                     id="firstName"
                     label="City"
                     autoFocus
                 />  */}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  color="secondary"
                  variant="standard"
                  disabled={true}
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Suggested Price"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  color="secondary"
                  variant="standard"
                  disabled={true}
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Total Price"
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
