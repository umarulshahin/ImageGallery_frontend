import {createSlice} from '@reduxjs/toolkit'

const UserSlice = createSlice({

    name : 'userdata',

    initialState:{
       email : ''  ,
       user : {}
    },
    reducers:{
        addEmail:(state,action)=>{
            state.email = action.payload
        },
        addUser:(state,action)=>{
            state.user=action.payload
        },
        ClearUser:(state,action)=>{
            state.user = {}
            state.email = ''
        }
    }

})

export const {addEmail,addUser,ClearUser}=UserSlice.actions

export default UserSlice.reducer;
