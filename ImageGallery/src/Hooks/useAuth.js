import axios from 'axios';
import { Forget_password_URL, Newpassword_URL, Signin_URL, Signup_URL } from '../Utils/Constance';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { addEmail, addUser } from '../Redux/UserSlice';

const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const Signup_axios = async (data, setSubmitting) => {
    const formdata = new FormData();
    formdata.append('username', data.username);
    formdata.append('email', data.email);
    formdata.append('password', data.password);

    try {
      const response = await axios.post(Signup_URL, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Signup successful!');
        navigate('/')
      }

    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        const errorMessage = data?.error?.email
          ? data.error.email[0]
          : 'Something went wrong';

        toast.warning(errorMessage);
      } else {
        toast.error('Network error or server not responding');
      }
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const Signin_axios = async(data,setSubmitting)=>{
     
    try{
      const response = await axios.post(Signin_URL,data,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(response.status===200){

        const userdetail = jwtDecode(response.data.access)
        Cookies.set('UserCookie',JSON.stringify(response.data),{expires:30})
        dispatch(addUser(userdetail))
        navigate('/home')
      }
    

    }catch(error){
        console.log(error.response.data.detail)
        if(error.response.data.detail){
          const errorMessage = error.response.data.detail || 'Something went wrong';
          toast.warning(errorMessage)
        }else{
          toast.error('Network error or server not responding');

        }
    }finally{
      setSubmitting(false)
    }
    
  }

  const Forget_Password_axios = async (urls,data)=>{
    console.log(data,'frorget password ')
    try{
      const response = await axios.post(urls,data,{
        headers:{
          'Content-Type':'application/json'

        }
      })
      if(response.status === 200){
        console.log(response.data,'froget password')
        if(response.data.message === 'OTP sent successfully'){
            console.log(response.data.email)
             dispatch(addEmail(response.data.email))
             navigate('/auth',{state:'otp'})
             toast.success('OTP sent successfully')

        }else if (response.data.message === 'OTP successfull'){
          navigate('/auth',{state:'Newpassword'})

          toast.success(response.data.message)
        }

      }
    }catch(error){
      console.log(error,'forget password')
      if(error.response.data.error){
        toast.warning(error.response.data.error)
      }
    }
  }

  const Newpassword_axios = async(data)=>{
    const formdata = new FormData()
    formdata.append('email',data.email)
    formdata.append('password',data.password)
    try{
     const response = await axios.patch(Newpassword_URL,formdata,{
      headers:{
         'Content-Type': 'multipart/form-data',
      }
     })
     if(response.status === 200){
      console.log(response.data,'new password')
      navigate('/')
      toast.success('Password updated successfully')
     }
    }catch(error){
      console.log(error,'new password')
    }
  }
  return { Signup_axios, Signin_axios,Forget_Password_axios,Newpassword_axios};
};

export default useAuth;
