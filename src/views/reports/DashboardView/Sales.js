import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors,
} from "@material-ui/core";
import { useStateValue } from "../../../context/StateProvider";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Sales = ({ className, ...rest }) => {
  const classes = useStyles();
  const [totalOrdersSimplified,setTotalOrdersSimplified]=useState(null)
  const theme = useTheme();
  const [{ totalOrders }] = useStateValue();
  useEffect(() => {
    const arr =    totalOrders.map((singleOrder) => ({
        date: moment.unix(singleOrder.created).format("DD MMMM YYYY"),
        amount: singleOrder.amount/100,
      }))
      
      const res = Array.from(arr.reduce(
        (m, {date, amount}) => m.set(date, (m.get(date) || 0) + amount), new Map
      ), ([date, amount]) => ({date, amount}));
      console.log(arr.reduce(
        (m, {date, amount}) => m.set(date, (m.get(date) || 0) + amount), new Map
      ), ([date, amount]) => ({date, amount}));
      
      setTotalOrdersSimplified(res);
  }, [totalOrders])


  const data = {
    datasets: [
      {
        backgroundColor: colors.orange[500],
        data: totalOrdersSimplified?.map((singleOrder=>singleOrder.amount)),
        label: "that day sale",
      },
    ],
    labels: [
      ...new Set(totalOrdersSimplified?.map((singleOrder) => singleOrder.date)),
    ],
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
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
      <CardHeader title="Latest Sales" />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string,
};

export default Sales;
