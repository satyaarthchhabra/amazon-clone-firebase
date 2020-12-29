import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, totalOrders, ...rest }) => {
  const classes = useStyles();
  
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);



  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                
                <TableCell>
                  OrderId
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  total Amount
                </TableCell>
                <TableCell>
Ordered At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalOrders.slice(0, limit).map((order,index) => (
                <TableRow
                  hover
                  key={index}
                  
                >
                  
                  <TableCell>
                    {order?.id}
                  </TableCell>
                  <TableCell>
                    {order?.email}
                  </TableCell>
                
                  <TableCell>
                  ₹
                    {order.amount/100}
                  </TableCell>
                  <TableCell>
                    {moment.unix(order.created).format('MMMM DD YYYY, h:mma')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalOrders.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  totalOrders: PropTypes.array.isRequired
};

export default Results;
