import { Box, Button, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../actions/userActions'

const Register = () => {
    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
    const dispatch=useDispatch()
	const [password, setPassword] = useState('')
    const submitHandler = (e) => {
		e.preventDefault()
		// Check if passwords match
		
			// Dispatch register
			dispatch(register(name, email, password))
		
	}
  return (
    
    <Box p="2rem" m="auto" mt="5rem" h="400px" className='login_box' w="30%">
        <form onSubmit={submitHandler}>
        <Text align="left" fontWeight="semibold">Enter Name <span className='star'>*</span></Text>
            <Input size="lg" mb="1rem" type='text'
						
						value={name}
						onChange={(e) => setName(e.target.value)}/>
                         <Text align="left" fontWeight="semibold">Enter Email <span className='star'>*</span></Text>
            <Input size="lg" mb="1rem" type='email'
						
						value={email}
						onChange={(e) => setEmail(e.target.value)}/>
                         <Text align="left" fontWeight="semibold">Enter Password <span className='star'>*</span></Text>
                         <Input size="lg" mb="1rem" type='password'
						
						value={password}
						onChange={(e) => setPassword(e.target.value)}/>
                        <Button mt="2rem" w="150px" borderRadius="50px" p="1.5rem" border="3px solid"  type='submit' _hover={{ bg: "white", color: " #03989e",borderColor:"03989e" }} bg="#03989e" color="white"  variant='primary'>
					Register
				    </Button>
        </form>
    </Box>
  )
}

export default Register
