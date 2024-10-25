import React, { useState } from 'react'
import profile from '../assets/profile_img.png'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { addUser, ClearUser } from '../Redux/UserSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const user = useSelector((state)=>state.userdata.user)
  const {username}=user
  const [toggleDropdown,settoggleDropdown]=useState(false)
  const dispatch = useDispatch()
  const navigate=useNavigate()
  
  const handleLogout=()=>{
    
    console.log('yes its working')
    Cookies.remove('UserCookie')
    dispatch(ClearUser(null))
    navigate('/')
    

  }

  return (
    <div className='bg-black text-emerald-500 h-20 flex justify-between px-10 items-center opacity-90'>
        <div className='text-3xl  font-bold '>
          <i>Fototus</i>
        </div>
        <div className='relative'>
      <div className='flex items-center space-x-2 cursor-pointer' onClick={()=>settoggleDropdown(!toggleDropdown)}>
        <span className='text-white text-lg font-semibold'>{username}</span>
        <img src={profile} className='h-10 w-10 rounded-full' alt="profile" />
      </div>

      {toggleDropdown && (
        <div className="absolute right-0 mt-4 w-48 bg-black opacity-90 rounded-lg shadow-lg z-10">
          <ul>
            <li onClick={()=>handleLogout()} className="px-4 py-2 hover:bg-red-600 hover:text-white font-bold  cursor-pointer">
              Log out
            </li>
          </ul>
        </div>
      )}
    </div>

    </div>
  )
}

export default Header