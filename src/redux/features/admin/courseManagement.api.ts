import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addRegisteredSemester: builder.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration",
                method: "POST",
                body: data,
            })
        }),
        getAllRegisteredSemesters: builder.query({
            query: () => ({
                url: "/semester-registrations",
                method: "GET",
            })
        })
    })
})

export const { useAddRegisteredSemesterMutation, useGetAllRegisteredSemestersQuery } = courseManagementApi;