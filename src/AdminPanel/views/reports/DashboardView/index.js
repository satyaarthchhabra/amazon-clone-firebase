import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../../Page/Page";
import TotalProducts from "./TotalProducts";
import Sales from "./Sales";
import TotalCustomers from "./TotalCustomers";

import TrafficBySeller from "./TrafficBySeller";
import TotalSales from "./TotalSales";
import TotalSellers from "./TotalSellers";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProducts />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalSellers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalSales />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficBySeller />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
