import axios from 'axios'

import {SERVER_URL} from "../config/server"

export const createEntry = async (data) => await axios.post(`${SERVER_URL}/entries`, JSON.stringify(data))
