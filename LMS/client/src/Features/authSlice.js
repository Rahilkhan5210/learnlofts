// import { createSlice } from "@reduxjs/toolkit";

// const initialState ={
//     user: null,
//     isAuthenticated: false,
// };

// const authSlice = createSlice({
//     name:"authSlice",
//     initialState,
//     reducers:{
//         userLoggedIn:(state,action)=>{
//             state.user = action.payload.user;
//             state.isAuthenticated = true;
//         },
//         userLoggedOut:(state)=>{
//             state.user = null;
//             state.isAuthenticated = false;
//         }
//     }
// });
// export const {userLoggedIn,userLoggedOut} = authSlice.actions;
// export default authSlice.reducer;

// new code 
import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user") 
  ? JSON.parse(localStorage.getItem("user")) 
  : null;

const initialState = {
    user: storedUser,
    isAuthenticated: !!storedUser, // Set isAuthenticated based on stored user
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload.user)); // Save user to localStorage
        },
        userLoggedOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user"); // Remove user from localStorage on logout
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
