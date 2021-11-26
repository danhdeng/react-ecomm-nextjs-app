import React, { useEffect, useContext, useReducer } from 'react';
import dynamic from 'next/dynamic';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { orderReducer } from '../reducers/orderReducer';
import axios from 'axios';
import { getError } from '../utils/error';

function OrderHistory() {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders }, dispatch] = useReducer(orderReducer, {
    loading: true,
    orders: [],
    error: '',
  });

  const fetchOrders = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/orders/history`, {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      const errMsg = getError(error);
      dispatch({ type: 'FETCH_FAIL', payload: errMsg });
    }
  };
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    fetchOrders();
  });
  return <div></div>;
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
