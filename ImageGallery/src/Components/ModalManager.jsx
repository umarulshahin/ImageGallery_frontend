import React, { useEffect, useState } from 'react'
import Forget_Password from './Forget_Password'
import { useLocation } from 'react-router-dom'
import SignIn from './SignIn'
import OtpModal from './OtpModal'
import New_Password from './New_Password'

const ModalManager = () => {
  const location = useLocation()
  const activemodal = location.state
  const [active , setActive ] = useState(activemodal ? activemodal: '')
  
  useEffect(()=>{
    if(activemodal){
      setActive(activemodal)

    }
  },[activemodal])
  
    
  return (
    <>
    {active === 'forget' && <Forget_Password />}
    {active === 'otp' && <OtpModal/>}
    {active === 'Newpassword' && <New_Password />}

    {!active && <SignIn /> }
    </>
  )
}

export default ModalManager