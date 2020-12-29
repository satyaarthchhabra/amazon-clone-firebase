import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,

  colors,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { useStateValue } from "../../../context/StateProvider";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const TrafficBySeller = ({ className, ...rest }) => {
  const classes = useStyles();

  const theme = useTheme();
  const [{ totalOrders }] = useStateValue();
  const array = [];
  totalOrders
    .map((order) => order.cart)
    .map((orderItem) => orderItem.map((item) => item.seller))
    .map((item) => item.map((item) => array.push(item)));
  let SortedObject = {};
  array
    .sort()
    .forEach(
      (seller) => (SortedObject[seller] = (SortedObject[seller] || 0) + 1)
    );
  let sellers = [];
  let noOfProducts = [];
  for (let key in SortedObject) {
    let value = SortedObject[key];
    sellers.push(key);
    noOfProducts.push(value);
  }

  const data = {
    datasets: [
      {
        data: noOfProducts,
        backgroundColor: [
          colors.amber[500],
          colors.blue[600],
          colors.blueGrey[600],
          colors.brown[600],
          colors.common[600],
          colors.cyan[600],
          colors.deepOrange[600],
          colors.green[600],
          colors.grey[600],
          colors.indigo[600],
          colors.lime[600],
          colors.orange[600],
          colors.pink[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: sellers,
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Orders by Seller" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficBySeller.propTypes = {
  className: PropTypes.string,
};

export default TrafficBySeller;
