import React from 'react'
import UserAxios from '../Axios/UserAxios'
import { Get_Image_URL, Image_upload_URL } from '../Utils/Constance'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { addImages } from '../Redux/UserSlice'

const useUser = () => {
  const dispatch = useDispatch()
  const Image_Upload_axios = async (formData)=>{

    try{
        const response = await UserAxios.post(Image_upload_URL,formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
    
            }
        })
        if(response.status === 200){
           
                console.log(response.data,'image upload')
                toast.success(response.data)
            
        }
    }catch(error){
        console.log(error,'image upload error')
    }
    
  }
  const Get_Image_axios = async()=>{
    try{
      const response = await UserAxios.get(Get_Image_URL,{
        headers:{
            'Content-Type':'application/json'
        }
      })
      if (response.status===200){
        console.log(response.data,'get image ')
        if(response.data.length>0){
            dispatch(addImages(response.data))

        }
      }
    }catch(error){
        console.log(error,'get image')
    }
  }
  return {Image_Upload_axios,Get_Image_axios}


}

export default useUser