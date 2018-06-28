import axios from 'axios';
import { FETCH_PRODUCT } from './type';

export const fetchProduct = () => async dispatch => {
    const res = await axios.get('/api/get/products');

    dispatch({ type: FETCH_PRODUCT, payload: res.data });
};
