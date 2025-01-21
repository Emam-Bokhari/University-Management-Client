import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addStudent: builder.mutation({
            query: (data) => ({
                url: "/users/create-student",
                method: "POST",
                body: data,
            })
        }),
        getAllStudents: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: any) => {
                        params.append(item.name, item.value)
                    })
                }

                return {
                    url: "/students",
                    method: "GET",
                    params: params,
                }
            },
            transformResponse: (response: any) => {
                return {
                    data: response.data,
                    meta: response.meta,
                }
            }
        })
    })
})

export const { useAddStudentMutation, useGetAllStudentsQuery } = userManagementApi;