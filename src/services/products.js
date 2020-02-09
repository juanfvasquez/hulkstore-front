import axios from 'axios'

import {SERVER_URL} from "../config/server"

export const fetchProducts = async () => await axios.get(`${SERVER_URL}/products`)
export const createProduct = async (data) => await axios.post(`${SERVER_URL}/products`, data)
export const updateProduct = async (id, data) => await axios.put(`${SERVER_URL}/products/${id}`, data)
