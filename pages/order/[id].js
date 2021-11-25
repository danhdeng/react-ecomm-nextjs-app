// import {
//   Card,
//   Grid,
//   Link,
//   List,
//   ListItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from '@material-ui/core';
// import axios from 'axios';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import NextLink from 'next/link';
// import { useRouter } from 'next/router';
// import { useSnackbar } from 'notistack';
// import React, { useContext, useEffect, useState } from 'react';
// import Layout from '../components/Layout';
// import { Store } from '../utils/Store';
// import useStyles from '../utils/styles';
// import { Round2 } from '../utils/utils';

// function OrderDetails() {
//   const { state, dispatch } = useContext(Store);
//   const classes = useStyles();
//   const router = useRouter();
//   const {
//     userInfo,
//     cart: { cartItems, shippingInfo, paymentMethod },
//   } = state;
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

//   const itemsPrice = Round2(
//     cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
//   );
//   const shippingPrice = itemsPrice > 200 ? 0 : 15;
//   const taxPrice = Round2(itemsPrice * 0.15);
//   const totalPrice = Round2(itemsPrice + shippingPrice + taxPrice);
//   const [loading, setLoading] = useState(false);
//   const {orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,}=order;
//   const fetchOrder = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.post(
//         '/api/order',
//         {

//         },
//         {
//           headers: {
//             authorization: `Bearer ${userInfo.token}`,
//           },
//         }
//       );
//       dispatch({ type: 'CART_CLEAR' });
//       setLoading(false);
//       router.push(`/order/${data._id}`);
//     } catch (error) {
//       setLoading(false);
//       enqueueSnackbar(
//         error.response && error.response.data && error.response.data.message
//           ? error.response.data.message
//           : error.response.data
//       );
//     }
//   };
//   useEffect(() => {
//     if (!userInfo) {
//       router.push('/login');
//     }

//   }, [router, userInfo]);
//   return (
//     <Layout title="Order Details">
//       <Typography component="h1" variant="h1">
//         Order Details
//       </Typography>
//       <Grid container spacing={1}>
//         <Grid item md={9} xs={12}>
//           <Card className={classes.section}>
//             <List>
//               <ListItem>
//                 <Typography component="h2" variant="h2">
//                   Shipping Address
//                 </Typography>
//               </ListItem>
//               <ListItem>
//                 {shippingInfo.fullName}, {shippingInfo.address},{' '}
//                 {shippingInfo.city}, {shippingInfo.postalCode},{' '}
//                 {shippingInfo.country}
//               </ListItem>
//             </List>
//           </Card>
//           <Card className={classes.section}>
//             <List>
//               <ListItem>
//                 <Typography component="h2" variant="h2">
//                   Payment Method
//                 </Typography>
//               </ListItem>
//               <ListItem>{paymentMethod}</ListItem>
//             </List>
//           </Card>
//           <Card className={classes.section}>
//             <List>
//               <ListItem>
//                 <Typography component="h2" variant="h2">
//                   Order Items
//                 </Typography>
//               </ListItem>
//               <ListItem>
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Image</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell align="right">Quantity</TableCell>
//                         <TableCell align="right">Price</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {cartItems.map((item) => (
//                         <TableRow key={item._id}>
//                           <TableCell>
//                             <NextLink href={`/product/${item.slug}`} passHref>
//                               <Link>
//                                 <Image
//                                   src={item.image}
//                                   alt={item.name}
//                                   width={50}
//                                   height={50}
//                                 ></Image>
//                               </Link>
//                             </NextLink>
//                           </TableCell>
//                           <TableCell>
//                             <NextLink href={`/product/${item.slug}`} passHref>
//                               <Link>
//                                 <Typography>{item.name}</Typography>
//                               </Link>
//                             </NextLink>
//                           </TableCell>
//                           <TableCell align="right">
//                             <Typography>{item.quantity}</Typography>
//                           </TableCell>
//                           <TableCell align="right">
//                             <Typography>${item.price}</Typography>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </ListItem>
//             </List>
//           </Card>
//         </Grid>
//         <Grid item md={3} xs={12}>
//           <Card className={classes.section}>
//             <List>
//               <ListItem>
//                 <Typography variant="h2">Order Summary</Typography>
//               </ListItem>
//               <ListItem>
//                 <Grid container>
//                   <Grid item xs={6}>
//                     <Typography>Items:</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography align="right">${itemsPrice}</Typography>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//               <ListItem>
//                 <Grid container>
//                   <Grid item xs={6}>
//                     <Typography>Tax:</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography align="right">${taxPrice}</Typography>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//               <ListItem>
//                 <Grid container>
//                   <Grid item xs={6}>
//                     <Typography>Shipping:</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography align="right">${shippingPrice}</Typography>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//               <ListItem>
//                 <Grid container>
//                   <Grid item xs={6}>
//                     <Typography>Total Price:</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography align="right">${totalPrice}</Typography>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//             </List>
//           </Card>
//         </Grid>
//       </Grid>
//     </Layout>
//   );
// }

// export default dynamic(() => Promise.resolve(OrderDetails), { ssr: false });
