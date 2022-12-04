import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { logout } from '../actions/userActions'
import Loader from './Loader'

const HomePage = () => {
    const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin
    
    const dispatch=useDispatch()
    const logoutHandler = () => {
		dispatch(logout())
	}
   
  return (
    <Box  w="40%" m="auto" mt="3rem">
        {loading && <Loader/>}
        <Flex gap="1rem" justifyContent="center" alignItems="center">
        <Text>Your Email ID: </Text>
        <Text fontWeight="bold" fontSize="25px">{userInfo.email}</Text>
        </Flex>
        <Button mt="2rem" w="150px" borderRadius="50px" p="1.5rem" border="3px solid"  _hover={{ bg: "white", color: " #03989e",borderColor:"03989e" }} bg="#03989e" color="white" onClick={logoutHandler}>Logout</Button>
    </Box>
  )
}

export default HomePage
