import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            // headers.set("Authorization",`Bearer ${token}`)
            headers.set("Authorization", `${token}`)
        }
        return headers;
    }
})

// const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
//     let result = await baseQuery(args, api, extraOptions);

//     if (result?.error?.status === 404) {
//         toast.error("User not found")
//     }

//     if (result.error?.status === 401) {
//         // console.log("Send refresh token")
//         const res = await fetch("http://localhost:3000/api/v1/auth/refresh-token", {
//             method: "POST",
//             credentials: "include",
//         })
//         const data = res.json();

//         if (data?.data?.accessToken) {
//             const user = (api.getState() as RootState).auth.user;

//             api.dispatch(
//                 setUser({
//                     user: user,
//                     token: data?.data?.accessToken,
//                 })
//             )

//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             api.dispatch(logout())
//         }
//     }
//     return result;

// }

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes: ["semester"]
})