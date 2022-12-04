import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin
    if(!userInfo)
    {
        return <Navigate to="/login"/>
    }
    else{
        return children
    }
 
}

export default Protected
