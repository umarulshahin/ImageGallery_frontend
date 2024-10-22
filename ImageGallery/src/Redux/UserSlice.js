import {createSlice} from '@reduxjs/toolkit'

const UserSlice = createSlice({

    name : 'userdata',

    initialState:{
       email : ''  ,
       user : {},
       images : {}
    },
    reducers:{
        addEmail:(state,action)=>{
            state.email = action.payload
        },
        addUser:(state,action)=>{
            state.user=action.payload
        },
        addImages:(state,action)=>{
            state.images=action.payload
        },
        ClearUser:(state,action)=>{
            state.user = {}
            state.email = ''
        }
    }

})

export const {addEmail,addUser,ClearUser,addImages}=UserSlice.actions

export default UserSlice.reducer;
