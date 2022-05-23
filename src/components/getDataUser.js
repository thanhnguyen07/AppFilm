import React, {useState, useEffect, useCallback} from 'react';
import url from '../components/url';
const axios = require('axios').default;

const Url = url();

export default function getDataUser()  {
  const [dataUsers,setDataUsers] = useState ([])
  useEffect(() => {
      try {
        axios.get(`${Url}/Users`)
        .then (res => {
          setDataUsers(res.data);
        })
      }
      catch (error) {
        console.error(error);
      }
    }, []);
  return dataUsers
}