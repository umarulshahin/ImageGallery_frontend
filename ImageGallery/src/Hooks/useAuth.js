import axios from 'axios';
import { Signin_URL, Signup_URL } from '../Utils/Constance';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const navigate = useNavigate()
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
        console.log(response.data, 'sign up');
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
      const responds = await axios.post(Signin_URL,data,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(responds.status===200){
        console.log(responds.data,'sign in ')
        const userdetail = jwtDecode(responds.data.access)
        console.log(userdetail,'userdetails')
        Cookies.set('UserCookie',JSON.stringify(responds.data),{expires:30})
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
  return { Signup_axios, Signin_axios };
};

export default useAuth;
