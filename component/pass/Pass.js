import React,{ createContext, useContext } from 'react'
import {UserContext} from '../Header/Header'
function Pass(props) {
    const user = useContext(UserContext);
    console.log(user)
  return (
    <>
        <div>{`${user}`}</div>
    </>
  )
}

export default Pass