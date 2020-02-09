import axios from 'axios'

import {SERVER_URL} from "../config/server"

export const createSale = async (data) => await axios.post(`${SERVER_URL}/sales`, data)
