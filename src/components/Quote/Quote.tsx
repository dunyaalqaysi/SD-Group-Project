import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../Navbar/Navbar";
import { endpoint_url } from "src/constants";
import "./Quote.scss"

export default function Quote() {
  const [dateState, setDate] = React.useState<Date | null>(new Date());
  const [galState, setGal] = React.useState<string>("10");
  const [suggestState, setSuggest] = React.useState<string>("");
  const [totalState, setTotal] = React.useState<string>("");
  const [errors, setErrors] = React.useState<any>({
    date: null,
    suggested: null,
    total: null,
    gallons: null,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    if (!dateState || dateState < new Date(new Date().setHours(0, 0, 0, 0)))
      return;

    data.append("gallons", galState);
    data.append("total", totalState);
    data.append("date", dateState!.toDateString());
    data.append("suggested", suggestState);
    console.log(dateState!.toDateString());
    fetch(`${endpoint_url}/quote`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) return;
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        console.log(data);
        for (const err in data) {
          setErrors((prev_errors: any) => ({
            ...prev_errors,
            [err]: data[err][0],
          }));
        }
      });
  };
  React.useEffect(() => {
    if (parseInt(galState) <= 0) {
      setSuggest("0");
      setTotal("0");
    } else {
      setSuggest(
        // a mess
        (
          1.5 +
          (0.02 - 0.01 + (parseInt(galState) > 1000 ? 0.02 : 0.03) + 0.1) * 1.5
        ).toString()
      );
      // location (2% for TX, 4% elsewhere) - history (if ordered before 1% else 0 %)
      // + 2% if gals > 1000 else 3%  + constant 10%
      setTotal((parseInt(galState) * parseFloat(suggestState)).toFixed(2));
    }
  }, [galState, suggestState]);

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
            Let's see how much your quote is.
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
                  name="gals"
                  value={galState}
                  onChange={(newGals) => {
                    setGal(newGals.target.value);
                    if (errors.gallons !== null)
                      setErrors({
                        date: errors.date,
                        gallons: null,
                        suggested: null,
                        total: null,
                      });
                  }}
                  helperText={errors.gallons !== null ? errors.gallons : ""}
                  error={errors.gallons !== null ? true : false}
                  required
                  type="number"
                  
                  fullWidth
                  id="gals"
                  label="Gallons Requested"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField
                  color="secondary"
                  variant="standard"
                  disabled={true}
                  value={"3030 Bay Dr, Houston, TX, 77077"} //temp
                  fullWidth
                  id="add1"
                  label="Address Line 1"
                  name="add1"
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
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disablePast
                    value={dateState}
                    onChange={(newValue) => {
                      setDate(newValue);
                      if (errors.date !== null)
                        setErrors({ ...errors, date: null });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={
                          errors.date !== null || dateState === null
                            ? true
                            : false
                        }
                        helperText={errors.date !== null ? errors.date : ""}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  color="secondary"
                  variant="standard"
                  disabled={true}
                  error={errors.suggested !== null ? true : false}
                  value={suggestState}
                  name="suggest"
                  fullWidth
                  id="suggest"
                  label="Suggested Price"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  color="secondary"
                  variant="standard"
                  disabled={true}
                  error={errors.total !== null ? true : false}
                  name="total"
                  value={totalState}
                  fullWidth
                  id="total"
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
              See Quote!
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
