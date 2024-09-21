import { AddressType, CartItemType, UserType } from "@/lib/type"
import {createSlice,PayloadAction} from "@reduxjs/toolkit"


interface initialStateType {
    user:UserType | null,
    isAuthenticated:boolean
}

const initialState:initialStateType = {
    user:null,
    isAuthenticated:false
}


export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
         AddUser:(state,actions:PayloadAction<UserType>)=>{
            state.user = actions.payload
            state.isAuthenticated = true
         },
         RemoveUser:(state)=>{
            state.user = null,
            state.isAuthenticated = false
         },
         AddNewAddress:(state,actions:PayloadAction<AddressType>)=>{
           if(state.user){
             state.user.address = [...state.user.address,actions.payload]
           }
         },
         RemoveAddress:(state,actions:PayloadAction<AddressType>)=>{
          if(state.user){
             const newAddress = state.user.address.filter((address)=>address.id !== actions.payload.id)
             state.user.address = newAddress
          }
         },
         AddCart:(state,actions:PayloadAction<CartItemType>)=>{
          if(state.user){
           state.user.cart = [...state.user?.cart,actions.payload]
          }
         },
         ChangeQuantity:(state,action:PayloadAction<{id:number,quantity:number}>)=>{
            if(state.user){
                const findCart = state.user.cart.find((cart)=>cart.id === action.payload.id)
                if(findCart){
                    findCart.quantity = action.payload.quantity
                }
            }
         },
         RemoveCart:(state,action:PayloadAction<{id:number}>)=>{
             if(state.user){
                state.user.cart = state.user.cart.filter((cart)=> cart.id !==action.payload.id)
             }
         }
    }
})


export const {AddUser,RemoveUser,AddNewAddress,RemoveAddress,
  AddCart,ChangeQuantity,RemoveCart} = userSlice.actions;
export default userSlice.reducer;