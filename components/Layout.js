import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';

export const Layout = ({children}) => {
    return (
        <div>
            <Head>Next Shopping App</Head>
            <AppBar position="static">
                <Toolbar>
                    <Typography>Dan's Store</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                {children}
            </Container>
        </div>
    )
}
