import {
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
//import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { orderReducer } from '../reducers/orderReducer';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';

function OrderHistory() {
  const router = useRouter();
  const classes = useStyles();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders }, dispatch] = useReducer(orderReducer, {
    loading: true,
    orders: [],
    error: '',
  });

  const fetchOrders = async () => {
    try {
      dispatch({ type: 'FETCH_ORDERS_REQUEST' });
      const { data } = await axios.get(`/api/orders/history`, {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: data });
    } catch (error) {
      const errMsg = getError(error);
      dispatch({ type: 'FETCH_ORDERS_FAIL', payload: errMsg });
    }
  };
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    fetchOrders();
  }, []);
  return (
    <Layout title="Order History">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <NextLink href={`/profile`} passHref>
              <ListItem button component="a">
                <ListItemText primary="User Profile"></ListItemText>
              </ListItem>
            </NextLink>
            <NextLink href={`/order-history`} passHref>
              <ListItem selected button component="a">
                <ListItemText primary="Order History"></ListItemText>
              </ListItem>
            </NextLink>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Order History
                </Typography>
              </ListItem>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography className={classes.error}>{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Total</TableCell>
                          <TableCell>Paid</TableCell>
                          <TableCell>Delivered</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id.substring(20, 40)}</TableCell>
                            <TableCell>{order.createdAt}</TableCell>
                            <TableCell>{order.totalPrice}</TableCell>
                            <TableCell>
                              {order.isPaid
                                ? `paid at ${order.paidAt}`
                                : 'not paid'}
                            </TableCell>
                            <TableCell>
                              {order.isDelivered
                                ? `delivered at ${order.deliveredAt}`
                                : 'not delivered'}
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/order/${order._id}`} passHref>
                                <Button variant="contained">Details</Button>
                              </NextLink>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
