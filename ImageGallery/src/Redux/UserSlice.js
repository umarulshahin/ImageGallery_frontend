import {createSlice} from '@reduxjs/toolkit'

const UserSlice = createSlice({

    name : 'userdata',

    initialState:{
       email : ''  
    },
    reducers:{
        addEmail:(state,action)=>{
            state.email = action.payload
        }
    }

})

export const {addEmail}=UserSlice.actions

export default UserSlice.reducer;
