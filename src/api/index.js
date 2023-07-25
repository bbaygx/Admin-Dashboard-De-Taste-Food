import axios from 'axios';
import { useEffect } from 'react';

export const getData = async () => {
    try{
        const value = await axios.get(`${import.meta.env.VITE_BASEURL}/restaurant`)
        return value.data
    }
    catch(err){
        console.log('Data Kosong')
    }
}

