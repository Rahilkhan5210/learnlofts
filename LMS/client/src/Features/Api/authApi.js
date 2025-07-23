// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn } from "../authSlice";

// const USER_API = "http://localhost:9000/api/v1/user/";

// export const authApi = createApi({
//     reducerPath: "authApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: USER_API,
//         credentials: "include",  
//     }),
//     endpoints: (builder) => ({
//         registerUser: builder.mutation({
//             query: (inputData) => ({
//                 url: "register",
//                 method: "POST",
//                 body: inputData,
//                 headers: { "Content-Type": "application/json" },  // ✅ Fix: Ensure JSON headers
//             }),
//         }),

//         loginUser: builder.mutation({
//             query: (inputData) => ({
//                 url: "login",
//                 method: "POST",
//                 body: inputData,
//                 headers: { "Content-Type": "application/json" },  // ✅ Fix: Ensure JSON headers
//             }),

//             async onQueryStarted(_, { queryFulfilled, dispatch }) {
//                 try {
//                     const { data } = await queryFulfilled;
//                     if (data?.user) {
//                         dispatch(userLoggedIn({ user: data.user }));  // ✅ Fix: Check if `data.user` exists
//                         console.log("User logged in:", data.user);
//                     } else {
//                         console.error("Login response missing user data", data);
//                     }
//                 } catch (error) {
//                     console.error("Login error:", error?.error?.data || error);
//                 }
//             },
           
//             loadUser: builder.query({
//                 query: () => ({
//                     url: "profile",
//                     method: "GET",
//                 }),
//             }),
//         }),
//     }),
// });

// export const { useRegisterUserMutation, useLoginUserMutation,useLoadUserQuery} = authApi;

// new code 
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice"; // ✅ Ensure userLoggedOut is imported

const USER_API = "http://localhost:9000/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        // ✅ Register user
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData,
                headers: { "Content-Type": "application/json" },
            }),
        }),

        // ✅ Login user
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData,
                headers: { "Content-Type": "application/json" },
            }),

            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.user) {
                        dispatch(userLoggedIn({ user: data.user }));
                        console.log("✅ User logged in:", data.user);
                    } else {
                        console.error("❌ Login response missing user data", data);
                    }
                } catch (error) {
                    console.error("❌ Login error:", error?.error?.data || error);
                }
            },
        }),

        // ✅ Logout user with state update
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET", // ✅ Fixed: Logout is usually a POST request
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(userLoggedOut()); // ✅ Ensure user state is cleared
                    console.log("✅ User logged out successfully");
                } catch (error) {
                    console.error("❌ Logout error:", error?.error?.data || error);
                }
            },
        }),

        // ✅ Load user profile
        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
        }),

        // ✅ Update user profile (multipart/form-data)
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "profile/update",
                method: "PUT",
                body: formData,
                headers: {
                    "Accept": "application/json",
                }, // ✅ Do not manually set "Content-Type" for multipart/form-data
            }),
        }),

        // Update password
        updatePassword: builder.mutation({
            query: (passwords) => ({
                url: "change-password",
                method: "PUT",
                body: passwords,
                headers: { "Content-Type": "application/json" },
            }),
        }),
    }),
});

// ✅ Export hooks
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation,
    useUpdatePasswordMutation,
} = authApi;



