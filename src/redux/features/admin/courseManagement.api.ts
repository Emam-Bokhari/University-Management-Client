import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addRegisteredSemester: builder.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["semester"]
        }),
        getAllRegisteredSemesters: builder.query({
            query: () => ({
                url: "/semester-registrations",
                method: "GET",
            }),
            providesTags: ["semester"]
        }),
        updateRegisteredSemester: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: "PATCH",
                body: args.data,
            }),
            invalidatesTags: ["semester"]
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: "/courses",
                method: "GET",
            })
        })
    })
})

export const { useAddRegisteredSemesterMutation, useGetAllRegisteredSemestersQuery, useUpdateRegisteredSemesterMutation, useGetAllCoursesQuery } = courseManagementApi;