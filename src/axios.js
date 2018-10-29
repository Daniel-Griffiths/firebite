import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter)),
  headers: {
    'api-username': process.env.REACT_APP_API_USERNAME,
    'api-token': process.env.REACT_APP_API_TOKEN
  }
})
