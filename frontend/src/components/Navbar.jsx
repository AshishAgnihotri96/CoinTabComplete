import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <Flex className='navbar' padding="1.5rem" gap="4rem" justifyContent="space-evenly" alignItems="center"> 
       <Image src="https://www.cointab.in/wp-content/uploads/2021/06/cointab_green-1.png"/>
        <Link to="/">
            <Text fontWeight="bold">Home</Text>
            </Link>
        <Link to="/login">
        <Text fontWeight="bold">Login</Text>
        </Link>
        <Link to="/register">
        <Text fontWeight="bold">Register</Text>
        </Link>
   </Flex>
  )
}

export default Navbar
