import React,{useState, useEffect, useContext, createContext} from 'react'
import {auth} from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()


export const Auth = ({children}) => {

  const [currentUser, setCurrentUser] = useState('')

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unSubscibe = onAuthStateChanged(auth, (currentUser) => {
      
      setCurrentUser(currentUser)
    })
  }, [])


  return (
    <>
      <AuthContext.Provider value={{signInUser, currentUser, logOut}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
