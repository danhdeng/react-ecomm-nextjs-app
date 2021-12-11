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
import {productAction} from '../../../reducers/productReducer';

export default function ProductEdit ({params}) {
    const productId=params.id;
    const {state}=useContext(Store);
    const [{loading, error, loadingUpate, loadingUpload}] =useReducer(productReducer,{
        loading: true, 
        error: '',
    })

    const {handleSubmit, control, formState:{errors}, setValue} =useForm();
    const router=useRouter();
    const classes = useStyles();
    const {userInfo}=state;

    useEffect(() => {
        if(!userInfo){
            return router.push('/login');
        }else{
            const fetchData=async()=>{
                try{
                    dispatch({ type: 'FETCH_PRODUCT_REQUEST'});
                    const {data} =await axios.get(`/api/admin/products/${productId}`,{
                        headers:{authorization: `Bearer ${userInfo.token}` },
                    });
                    dispatch({ type: 'FETCH_PRODUCT_SUCCESS'});
                    setValue('name', data.name);
                    setValue('slug', data.slug);
                    setValue('price', data.price);
                    setValue('image', data.image);
                    setValue('featuredImage', data.featuredImage);
                    setIsFeatured(data.isFeatured);
                    setValue('category', data.category);
                    setValue('brand', data.brand);
                    setValue('countInStock', data.countInStock);
                    setValue('description', data.description);
                }
                catch(err){
                    console.log(err);
                    dispatch({ type: 'FETCH_PRODUCT_FAIL', payload: getError(err)});
                }
            }
            fetchData();
        }
    },[]);

    const uplaodHandler=async (e, imageField='image') => {
        const file=e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);  
        try{
            dispatch({ type: 'UPLOAD_PRODUCT_REQUEST'});
            const {data} =await axios.post('/api/admin/upload', bodyFormData,{
                headers: {
                    'Content-Type' : 'multipart/form-data',
                    authorization: `Bearer ${userInfo.token}`,
                },
            });
            dispatch({ type: 'UPLOAD_PRODUCT_SUCESS'});
            setValue(imageField, data.secure_url);
            enqueueSnackbar('File uploaded sucessfully', {variant: 'success'});

        }catch(err){
            console.log(err);
            dispatch({ type: 'UPLOAD_PRODUCT_FAIL', payload: getError(err)});
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    }

    const submitHandler=async({name, slug, price, category, image, featuredImage, brand, countInStock, description})=>{
        closeSnackbar();
        try{
            dispatch({ type: 'UPDATE_PRODUCT_REQUEST'});
            await axios.put(`/api/admin/products/${productId}`,{
                name, 
                slug, 
                price, 
                category, 
                image, 
                featuredImage, 
                brand, 
                countInStock, 
                description
            },{
                headers: {
                'Content-Type' : 'multipart/form-data',
                authorization: `Bearer ${userInfo.token}`,
            }});
        }catch(err){
            console.log(err);
            dispatch({ type: 'UPDATE_PRODUCT_FAIL', payload: getError(err)});
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    }

    const [isFeatured, setIsFeatured]= useState(false);

    return (
        <Layout title={`Edit Product ${productId}`}>
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
                                Edit Product {productId}
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
                                        <Controller
                                            name="slug"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="slug"
                                                    label="Slug"
                                                    error={Boolean(errors.slug)}
                                                    helperText={errors.slug ? 'Slug is required': ''}
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </ListItem>
                                    <ListItem>
                                        <Controller
                                            name="price"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="price"
                                                    label="Price"
                                                    error={Boolean(errors.price)}
                                                    helperText={errors.price ? 'Price is required': ''}
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </ListItem>
                                    <ListItem>
                                        <Controller
                                            name="image"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="image"
                                                    Label="Image"
                                                    error={Boolean(errors.image)}
                                                    helperText={errors.image ? 'Image is required': ''}
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </ListItem>
                                    <ListItem>
                                        <Button variant="contained" component="label">
                                            Upload File
                                            <input type="file" onChange={uplaodHandler} hidden />
                                        </Button>
                                        {loadingUpload && <CircularProgress />}
                                    </ListItem>
                                    <ListItem>
                                        <Controller
                                            name="category"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="category"
                                                    label="Category"
                                                    error={Boolean(errors.category)}
                                                    helperText={errors.category ? 'Category is required': ''}
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </ListItem>
                                    <ListItem>
                                        <Controller
                                            name="brand"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="brand"
                                                    label="Brand"
                                                    error={Boolean(errors.brand)}
                                                    helperText={errors.brand ? 'Brand is required': ''}
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </ListItem>
                                    <ListItem>
                                        <Controller
                                            name="countInStock"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="countInStock"
                                                    label="Count In Stock"
                                                    error={Boolean(errors.countInStock)}
                                                    helperText={errors.countInStock ? 'Count In Stock is required': ''}
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </ListItem>
                                    <ListItem>
                                        <Controller
                                            name="description"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="description"
                                                    label="Description"
                                                    error={Boolean(errors.description)}
                                                    helperText={errors.description ? 'Description is required': ''}
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>
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
                                        {loadingUpate && <CircularProgress />}
                                    </ListItem>
                                </List>
                            </form>
                        </ListItem>
                    </List>
                </Card>
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


export defaultValue dynamic(() => Promise.resolve(ProductEdit), { ssr: false });

