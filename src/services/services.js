import axios from 'axios'

import {SERVER_URL} from "../config/server"

export const fetchProducts = async () => await axios.get(`${SERVER_URL}/productos-q`)
export const createProduct = async (data) => await axios.post(`${SERVER_URL}/producto-cmd`, data )

export const fetchMasterValues = async (type) => await axios.get(`${SERVER_URL}/maestro-valor-q?objetive=${type}`)

export const createTransaction = async (data) => await axios.post(`${SERVER_URL}/transacciones-productos-cmd`, data)
