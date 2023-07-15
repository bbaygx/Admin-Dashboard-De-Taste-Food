import axios from 'axios';

export const getData = async () => {
    const value = await axios.get(`${import.meta.env.VITE_BASEURL}/restaurant`)
    return value.data
}