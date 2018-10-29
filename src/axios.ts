import axios from 'axios'

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'api-username': process.env.REACT_APP_API_USERNAME,
    'api-token': process.env.REACT_APP_API_TOKEN
  }
})
