import {createSlice} from '@reduxjs/toolkit'

const UserSlice = createSlice({

    name : 'userdata',

    initialState:{
       email : ''  ,
       user : {},
       images : []
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
        DeleteImage:(state,action)=>{
           const id = action.payload
           state.images=state.images.filter(image => image.id != id)
        },
        ClearUser:(state,action)=>{
            state.user = {}
            state.email = ''
            state.images = []
        }
    }

})

export const {addEmail,addUser,ClearUser,addImages,DeleteImage}=UserSlice.actions

export default UserSlice.reducer;
