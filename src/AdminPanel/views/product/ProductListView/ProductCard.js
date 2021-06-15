import React from "react";
import PropTypes from "prop-types";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarBorder";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Switch,
} from "@material-ui/core";


import { db } from "../../../../firebase/firebaseConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ProductCard = ({ className, product, ...rest }) => {
  // const [show, setShow] = useState(true);
  const classes = useStyles();
  let halfRating = (product.rating - Math.floor(product.rating)) * 10;
  let outline = 0;
  halfRating > 0
    ? (outline = 5 - Math.ceil(product.rating))
    : (outline = 5 - Math.floor(product.rating));

  const handleChangeSwitch = (event) => {
    db.collection("products")
      .doc(product?.docId)
      .update({
        show: event.target.checked,
      })
      .catch((err) => console.log(err));
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar alt="Product" src={product.image} variant="circle" />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.title}
        </Typography>
        <Typography align="center" color="primary" variant="body1">
          for <h3> ₹ {product.price} </h3>
          {Array(Math.floor(product.rating))
            .fill()
            .map((_, index) => (
              <StarIcon key={index} />
            ))}
          {halfRating > 0 ? <StarHalfIcon /> : <></>}
          {outline > 0
            ? Array(outline)
                .fill()
                .map((_, index) => <StarOutlineIcon key={index} />)
            : ""}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <PersonPinIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              <h5>{product.seller}</h5>
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
 
            <Typography color="textSecondary" display="inline" variant="body2">
              <Switch
                checked={product.show}
                onChange={handleChangeSwitch}
                name="show"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
