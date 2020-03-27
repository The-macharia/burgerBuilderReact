import axios from 'axios';

const orderInstance = axios.create({
    baseURL: 'https://burger-builder-e839e.firebaseio.com',

})

export default orderInstance;