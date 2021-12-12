import React, {useEffect, useContext, useReducer, useState} from 'react'
import axios from 'axios';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import {Grid, List, ListItem, Typography, Card, Button, ListItemText, TextField, CircularProgress, FormControlLabel, Checkbox,} from '@material-ui/core';
import {getError} from '../../../utils/console.error';
import Store from '../../../utils/Store';
import {Layout} from '../../../components/Layout';
import {useStyles} from '../../../styles';
import {Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import {userReducer} from '../../../reducers/userReducer';

export default function UserEdit ({params}) {
    onst userId=params.id;
    const {state}=useContext(Store);
    const [{loading, error, loadingUpate, loadingUpload}] =useReducer(userReducer,{
        loading: true, 
        error: '',
    })

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const {handleSubmit, control, formState:{errors}, setValue} =useForm();
    const router=useRouter();
    const classes = useStyles();
    const {userInfo}=state;
    const [isAdmin, setIsAdmin]= useState(false);
    useEffect(() => {
        if(!userInfo){
            return router.push('/login');
        }else{
            const fetchData=async()=>{
                try{
                    dispatch({ type: 'FETCH_USER_REQUEST'});
                    const {data} =await axios.get(`/api/admin/users/${userId}`,{
                        headers:{authorization: `Bearer ${userInfo.token}` },
                    });
                    dispatch({ type: 'FETCH_USER_SUCCESS'});
                    setValue('name', data.name);
                    setIsAdmin(data.isAdmin);
                }
                catch(err){
                    console.log(err);
                    dispatch({ type: 'FETCH_USER_FAIL', payload: getError(err)});
                }
            }
            fetchData();
        }
    },[]);

    const submitHandler=async({name})=>{
        closeSnackbar();
        try{
            dispatch({ type: 'UPDATE_USER_REQUEST'});
            await axios.put(`/api/admin/users/${userId}`,{
                name, 
                isAdmin
            },{
                headers: {
                authorization: `Bearer ${userInfo.token}`,
            }});
      dispatch({ type: 'UPDATE__USER_SUCCESS' });
      enqueueSnackbar('User updated successfully', { variant: 'success' });
      router.push('/admin/users');
        }catch(err){
            console.log(err);
            dispatch({ type: 'UPDATE_USER_FAIL', payload: getError(err)});
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    }

    return (
        <Layout title={`Edit User ${userId}`}>
            <Grid container spacing={1}>
                <Grid item md={3} xs={12}>
                    <Card className={classes.section}>
                    <List>
                        <NextLink passHref href="/admin/dashboard">
                            <ListItem button component="a">
                                <ListItemText primary="Admin Dashboard">
                                </ListItemText>
                            </ListItem>
                        </NextLink>
                        <NextLink passHref href="/admin/orders">
                            <ListItem button component="a">
                                <ListItemText primary="Orders">
                                </ListItemText>
                            </ListItem>
                        </NextLink>
                        <NextLink passHref href="/admin/products">
                            <ListItem button component="a">
                                <ListItemText primary="Products">
                                </ListItemText>
                            </ListItem>
                        </NextLink>
                        <NextLink passHref href="/admin/users">
                            <ListItem button component="a">
                                <ListItemText primary="Users">
                                </ListItemText>
                            </ListItem>
                        </NextLink>
                    </List>
                    </Card>
                </Grid>
            </Grid>
            <Grid item md={9} xs={12}>
                <Card className={classes.section}>
                    <List>
                        <ListItem>
                            <Typography component="h1" variant="h1">
                                Edit User {userId}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            {loading && <CircularProgress></CircularProgress>}
                            {error && (
                                <Typography className={classes.error}>{error}</Typography>
                            )}
                        </ListItem>
                        <ListItem>
                            <form onSubmit={handleSubmit(submitHandler)}
                            className={classes.form}>
                                <List>
                                    <ListItem>
                                        <Controller
                                            name="name"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="name"
                                                    label="Name"
                                                    error={Boolean(errors.name)}
                                                    helperText={errors.name ? 'Name is required': ''}
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </ListItem>
                                    <ListItem>
                                        <FormControlLabel 
                                            label="Is Admin"
                                            control={
                                                <Checkbox 
                                                    onClick={(e)=>setIsAdmin(e.target.checked)}
                                                    checked={isAdmin}
                                                    name="isAdmin" />
                                            }
                                        ></FormControlLabel>
                                    </ListItem>
                                    
                                    <ListItem>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            fullWidth
                                            color="primary"
                                        >
                                            Update
                                        </Button>
                                        {loadingUpdate && <CircularProgress />}
                                    </ListItem>
                                </List>
                            </form>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
      </Grid>
        </Layout>
    )
}

export async function getServerSideProps({ params}){
    return {
        props:{
            params
        },
    };
}


export defaultValue dynamic(() => Promise.resolve(UserEdit), { ssr: false });