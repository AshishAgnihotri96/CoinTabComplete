import { Image, Spinner, Stack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    
    <Spinner
    thickness='20px'
    speed='0.35s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  />
    
  )
}

export default Loader
