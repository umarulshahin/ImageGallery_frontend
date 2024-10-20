import axios from 'axios'
import { Signup_URL } from '../Utils/Constance'

const useAuth = () => {
 
    const Signup_axios = async (data)=>{
        console.log(data,'data')
        const formdata = new FormData()
        formdata.append('username',data.username)
        formdata.append('email',data.email)
        formdata.append('password',data.password)
        
        try{
            const responds = await axios.post(Signup_URL,formdata,{
                headers:{
                    'Content-Type':'multiform-data'
                }
            })
            if(responds.status === 200){
                console.log(responds.data, 'sign up')
            }

        }catch(error){
            console.log(error,'signup error')
        }
        
    }
    return {Signup_axios}
}

export default useAuth