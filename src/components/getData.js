import React, {useState, useEffect} from 'react';
import url from '../components/url';
const axios = require('axios').default;

const Url = url();

export default function getData() {
  // console.log("Run GetData Film");
    const [dataFilms,setDataFilms] = useState ([])
    useEffect(() => {
        try {
          axios.get(`${Url}/DataFilms`)
          .then (res => {
            setDataFilms(res.data);
          })
        }
        catch (error) {
          console.error(error);
        }
      }, []);
    return dataFilms
}