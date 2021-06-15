import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../../Page/Page';
import Results from './Results';

import { useStateValue } from '../../../../context/StateProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const OrdersListView = () => {
  const classes = useStyles();
  const [{ totalOrders }] = useStateValue();


  return (
    <Page
      className={classes.root}
      title="Orders"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Results totalOrders={totalOrders.sort((a,b) => (a.created < b.created) ? 1 : ((b.created <a.created) ? -1 : 0))} />
        </Box>
      </Container>
    </Page>
  );
};

export default OrdersListView;
