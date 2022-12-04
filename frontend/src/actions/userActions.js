import axios from 'axios'
import { useSelector } from 'react-redux'


import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
    USER_LIST_RESET,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
 
	
	
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {

	try {
		dispatch({ type: USER_LOGIN_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// Make post request to login
		const { data } = await axios.post(
			'https://cointabbackend-production.up.railway.app/api/users/login',
			{ email, password },
			config
		)
           
		dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: data,
                })
                // Set user to local storage
                localStorage.setItem('userInfo', JSON.stringify(data))
			   
            	
	} catch (error) {
		dispatch({type:USER_LOGIN_FAIL})
		var today = new Date();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var currentTime=date.concat(" ",time)
		
		 
			if(error.response.status==401)
			{    const getRes = await axios({
					method: 'post',
					url: 'https://cointabbackend-production.up.railway.app/api/users/profile',
					data: {
					email:email
					}
					});
					
				
				if(getRes.data.count===4)
				{	
					const res = await axios({
						method: 'put',
						url: 'https://cointabbackend-production.up.railway.app/api/users/profile',
						data: {
						email:email,
						count:getRes.data.count,
						blocked:true,
						blockedTime:currentTime
						}
					});
					
					
				}	
				else if(getRes.data.count<6){
					const res = await axios({
						method: 'put',
						url: 'https://cointabbackend-production.up.railway.app/api/users/profile',
						data: {
						email:email,
						count:getRes.data.count+1,
						blocked:false,
						blockedTime:""
						}
					});
				}
			}

			
		
		 
	}
}

export const logout = () => (dispatch) => {
	
	localStorage.removeItem('userInfo')

	dispatch({ type: USER_LOGOUT })
	
	dispatch({ type: USER_LIST_RESET })
  
	
}

 

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// Make post request to register
		const { data } = await axios.post(
			'https://cointabbackend-production.up.railway.app/api/users',
			{ name, email, password },
			config
		)
		// Dispatch register
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})
		if(data)
		{
			alert("Register Successfull")
		}
	
		// Set user to local storage
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				  error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}



