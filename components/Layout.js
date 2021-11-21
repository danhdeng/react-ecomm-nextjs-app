import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import useStyles from '../utils/styles';
export const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Head>Next Shopping App</Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>Dan Store</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All Rights Reserved Dan Store</Typography>
      </footer>
    </div>
  );
};
