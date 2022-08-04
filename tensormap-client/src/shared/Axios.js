import axios from 'axios';
import * as urls from '../constants/Urls';

const Axios = axios.create({ baseURL: urls.base_URL});

export  default Axios
