import React, { useState } from 'react'
import { Navigate,useNavigate, Link } from 'react-router-dom'
// import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth'
// import { useAuth } from '../../contexts/authContext'
import { ChakraProvider, Card,Button, CircularProgress,useDisclosure, CircularProgressLabel,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter, Center } from '@chakra-ui/react'
import Login_User from "./Login_User"
import Login_Admin from "./Login_Admin"
const Home_Authentication = () => {
    const navigate = useNavigate();
    //when the user choice is selected
  const handleUser = ()=>{
       navigate('/Login_User')
  }
  //when the admin choice is selected
  const handleAdmin = ()=>{
    navigate('/Login_Admin')
  }

    return (
        <ChakraProvider>
          <Center marginTop={50} >
            <Card height={100} width={200} onClick={handleUser}>
             <Center marginTop={5}>
                 
            <Button onClick={handleUser} background={'white'} fontSize={20}>Data Encoder</Button>
            </Center>

            </Card>
            <Card height={100} width={200} onClick={handleAdmin}>
                <Center marginTop={5}>

               
            <Button onClick={handleAdmin} background={'white'} fontSize={20}>Admin</Button>
            </Center>
            </Card>
          </Center>
         
        </ChakraProvider>
    )
}

export default Home_Authentication