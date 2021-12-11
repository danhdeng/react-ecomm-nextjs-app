export const productReducer=(state, action)=> {
    switch (action.type) {
      case 'FETCH_PRODUCT_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_PRODUCT_SUCCESS':
        return { ...state, loading: false, error: '' };
      case 'FETCH_PRODUCT_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'UPDATE_PRODUCT_REQUEST':
        return { ...state, loadingUpdate: true, errorUpdate: '' };
      case 'UPDATE_PRODUCT_SUCCESS':
        return { ...state, loadingUpdate: false, errorUpdate: '' };
      case 'UPDATE_PRODUCT_FAIL':
        return { ...state, loadingUpdate: false, errorUpdate: action.payload };
      case 'UPLOAD_PRODUCT_REQUEST':
        return { ...state, loadingUpload: true, errorUpload: '' };
      case 'UPLOAD_PRODUCT_SUCCESS':
        return {
          ...state,
          loadingUpload: false,
          errorUpload: '',
        };
      case 'UPLOAD_PRODUCT_FAIL':
        return { ...state, loadingUpload: false, errorUpload: action.payload };
  
      default:
        return state;
    }
  }