import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../../Page/Page';
import ProductCard from './ProductCard';
import { useStateValue } from '../../../../context/StateProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));


const ProductList = () => {
  const classes = useStyles();
  const [{ products }] = useStateValue();
  

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
       
      </Container>
    </Page>
  );
};

export default ProductList;
