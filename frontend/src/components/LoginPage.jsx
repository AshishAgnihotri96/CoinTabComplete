import { Box, Button, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import { getUserDetails, login, updateUserProfile } from '../actions/userActions'
import { USER_DETAILS_SUCCESS, USER_PROFILE_BLOCKED, USER_PROFILE_UNBLOCKED } from '../constants/userConstants'
import Loader from './Loader'
import axios from   'axios'
const LoginPage = () => {
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin
    const userDetails = useSelector((state) => state.userDetails)
    const { user } = userDetails
    let newCheckTime=user.blockedTime
    
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var currentTime=date.concat(" ",time)
 
    function diff_hours(dt2, dt1) 
     {

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  
    }

let dt1 = new Date(newCheckTime);
let dt2 = new Date(currentTime);

let timeDiffrence= diff_hours(dt1, dt2)

 useEffect(()=>{
    if(timeDiffrence>=24)
    {
     const res =  axios({
         method: 'put',
         url: 'https://cointabbackend-production.up.railway.app/api/users/profile',
         data: {
         email:email,
         count:1,
         blocked:false,
         blockedTime:""
         }
     });
    }
 },[timeDiffrence,dt2])
 
    const submitHandler = async(event) => {
		event.preventDefault()
		dispatch(login(email,password))
        const getRes = await axios({
            method: 'post',
            url: 'https://cointabbackend-production.up.railway.app/api/users/profile',
            data: {
            email:email
            }
            });
            dispatch({type:USER_DETAILS_SUCCESS,payload:getRes.data})
      
	}
   useEffect(()=>{
    if(userInfo && user.blocked==false )
    { 
        const res =  axios({
            method: 'put',
            url: 'https://cointabbackend-production.up.railway.app/api/users/profile',
            data: {
            email:email,
            count:1,
            blocked:false,
            blockedTime:""
            }
        });
     navigate("/")  

    }
    else{
   
     navigate("/login")
    }
   },[userInfo,user])

  return (
        <Box p="2rem" m="auto" mt="5rem" h="400px" className='login_box' w="30%">
                {loading && <Loader/>}

                <p className='star'>{user.blocked?"Your Account has beed blocked for 24 hours":""}</p>
                 <form onSubmit={submitHandler}>
                    <Text align="left" fontWeight="semibold">Work Email Address <span className='star'>*</span></Text>
                    <Input size="lg" variant='outline' type="email" 
						value={email}
						onChange={(e) => setEmail(e.target.value)}/>
                         <Text align="left" fontWeight="semibold">Password <span className='star'>*</span></Text>
                    <Input size="lg" type="password"  
						value={password}
						onChange={(e) => setPassword(e.target.value)}/>
                        {/* <p className='star'>{error}</p>
                        <p className='star'>{error=="Invalid Password"?`You Have ${5-count} Attempts Left`:""}</p> */}
                         
                        <Button disabled={user.blocked} mt="2rem" w="150px" borderRadius="50px" p="1.5rem" border="3px solid"  _hover={{ bg: "white", color: " #03989e",borderColor:"03989e" }} bg="#03989e" color="white" type='submit'>Submit</Button>
                </form>   
   </Box>
  )
}

export default LoginPage
