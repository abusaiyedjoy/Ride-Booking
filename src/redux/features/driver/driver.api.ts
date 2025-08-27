import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDriver: builder.mutation({
      query: (driverInfo) => ({
        url: "/driver/create-profile",
        method: "POST",
        data: driverInfo,
      }),
    }),
    driverInfo: builder.query({
      query: () => ({
        url: "/driver/me",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    })
  }),
});

export const { useCreateDriverMutation, useDriverInfoQuery } = driverApi;