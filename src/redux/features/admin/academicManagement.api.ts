/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponse } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: (args) => {

                const params = new URLSearchParams();

                if (args) {

                    args.forEach((item: TQueryParam) => {

                        params.append(item.name, item.value as string);
                    })
                }


                return {
                    url: "/academic-semesters",
                    method: "GET",
                    params: params,
                }
            },
            transformResponse: (response: TResponse<TAcademicSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            }
        }),
        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: "/academic-semesters/create-academic-semester",
                method: "POST",
                body: data,
            })
        }),
        getAllAcademicDepartment: builder.query({
            query: () => ({
                url: "/academic-departments",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return {
                    data: response.data,
                    meta: response.meta,
                }
            }
        })
    })
})

export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation, useGetAllAcademicDepartmentQuery } = academicManagementApi;