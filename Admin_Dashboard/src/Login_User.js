import React, { useState, useContext } from 'react'
import { Navigate,useNavigate, Link } from 'react-router-dom'
// import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth'
// import { useAuth } from '../../contexts/authContext'
import { initializeApp } from 'firebase/app';
import { getDatabase,remove,ref,set,push, query, orderByChild, startAfter, limitToFirst, get, endAt,startAt, equalTo, endBefore, update } from 'firebase/database';

import { ChakraProvider,Button, CircularProgress,useDisclosure, CircularProgressLabel,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter } from '@chakra-ui/react'
import {AdminLogin,AlmanacLogin,BusinessLogin} from './context'
const firebaseConfig = {
    apiKey: "AIzaSyAeHg32VjgFEPlnwQ1djM1krCQ3lz8GDUY",
    authDomain: "chamber-60982.firebaseapp.com",
    databaseURL: "https://chamber-60982-default-rtdb.firebaseio.com",
    projectId: "chamber-60982",
    storageBucket: "chamber-60982.appspot.com",
    messagingSenderId: "1037511136316",
    appId: "1:1037511136316:web:b7b7dbbb55478ec9ef1f39",
    measurementId: "G-WRCCQRZC52"
  
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const dataRef = ref(database, 'User'); 
const Login_User = () => {
    const navigate = useNavigate();
    // const { userLoggedIn } = useAuth()
    const {adminLogin, setadminLogin} = useContext(AdminLogin);
    const {almanacLogin, setalmanacLogin} = useContext(AlmanacLogin);
    const {businessLogin, setbusinessLogin} = useContext(BusinessLogin);
  

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [isSigningIn, setIsSigningIn] = useState(false)
    // const [errorMessage, setErrorMessage] = useState('')

    const handleOnClick = async (e) => {
        e.preventDefault();
        //  console.log('loging')
        // const dataRef_alamanac = ref(database,'Almanac')
       try{
        const queryRef = query(dataRef, orderByChild('email'),startAt(email),endAt(email!== '' ? email + '\uffff' : null)); // Replace 'searchField' with your actual searchable field
        const snapshot = await get(queryRef);
        const fetchedData = snapshot.val() ? Object.values(snapshot.val()) : [];
        // console.log(fetchedData[0]['email'])
        // console.log(fetchedData[0]['email']==email)
        // console.log(fetchedData[0]["password"]==password)
        const role = fetchedData[0]['role']
        
        if(fetchedData[0]['email']==email && fetchedData[0]["password"]==password){
            // console.log(fetchedData[0]['status'][0])

            if(fetchedData[0]['status']=='Active'){
                if(role=='Admin'){
                    console.log('admin')
                    setadminLogin(true)
                    // navigate(`/${role}`);
                }
                if(role=='almanac'){
                    setalmanacLogin(true)
                    // navigate(`/${role}`);
                }
                if(role=='business'){
                    setbusinessLogin(true)
                    // navigate(`/${role}`);
                }
                navigate(`/${role}`); 

            }
            else{
                alert('Inactive Account')
            }
        }
     else{
        alert('Incorrect password')
     } 
       }
       catch(e){
        alert('incorrect email address')
       }
        // const queryRef_Almanac = query(dataRef_alamanac, orderByChild('Account Name'),startAfter(searchTerm), limitToFirst(10)); // Replace 'searchField' with your actual searchable field 
        // const data = snapshot.val()
     
    //    console.log(email," ",password)
        // e.preventDefault()
        // navigate('/business');
        // if(!isSigningIn) {
        //     setIsSigningIn(true)
        //     await doSignInWithEmailAndPassword(email, password)
        //     // doSendEmailVerification()
        // }
    }

  

    return (
        <ChakraProvider>

        
        <div>
            {/* {userLoggedIn && (<Navigate to={'/home'} replace={true} />)} */}

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Welcome Back</h3>
                        </div>
                    </div>
                    <form
                       
                        className="space-y-5"
                    >
                      
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>


                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {/* {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )} */}
                        <button
                            // type="submit"
                            // disabled={isSigningIn}
                            className="w-full px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300`"
                        onClick={handleOnClick}
                        >
                            Sign In
                        </button>
                    </form>
                  
                </div>
            </main>
        </div>
        </ChakraProvider>
    )
}

export default Login_User