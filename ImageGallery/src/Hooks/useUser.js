import React from 'react'
import UserAxios from '../Axios/UserAxios'
import { Delete_Image_URL, Get_Image_URL, Image_Order_URL, Image_upload_URL } from '../Utils/Constance'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { addImages, DeleteImage } from '../Redux/UserSlice'

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
                Get_Image_axios()
            
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

  const Image_Ordering_axios= async (orderUpdates,setOrderedImages,setIsUpdatingOrder)=>{

    try{

      const response = await UserAxios.put(Image_Order_URL,orderUpdates,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(response.status===200){
        console.log(response.data)
      }
    }catch(error){
      console.log(error)
      setIsUpdatingOrder(false);
 
      setOrderedImages(prevImages => [...prevImages]);
    }
  }

  const Image_Delete_axios = async(selectedImage)=>{
    console.log(selectedImage.id,'id')
    try{
      const response = await UserAxios.delete(Delete_Image_URL,{
        data:selectedImage.id,
        headers:{
          'Content-Type':'application/json',
        }
      })
      console.log(response,'response')
      if(response.status === 200){
        console.log(response.data,'delete image')
        dispatch(DeleteImage(selectedImage.id))
      }
    }catch(error){
      console.log(error)
  }
}
  return {Image_Upload_axios,Get_Image_axios,Image_Ordering_axios,Image_Delete_axios}


}

export default useUser