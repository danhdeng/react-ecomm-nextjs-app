export const orderReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ORDER_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_ORDER_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_ORDER_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_ORDERS_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_ORDERS_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_ORDERS_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false, errorDeliver: action.payload };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        errorDeliver: '',
      };
    default:
      state;
  }
};
