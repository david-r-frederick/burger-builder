import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://react-my-burger-fc3a1.firebaseio.com/',
    }
)

export default instance;