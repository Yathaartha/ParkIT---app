import axios from 'axios';

export const baseApi = axios.create({
  baseURL: 'http://10.0.2.2:7000',
});
