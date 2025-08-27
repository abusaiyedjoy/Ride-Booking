import { baseApi } from "@/redux/baseApi";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createrider: builder.mutation({
      query: (riderInfo) => ({
        url: "/rider/create-profile",
        method: "POST",
        data: riderInfo,
      }),
    }),
    riderInfo: builder.query({
      query: () => ({
        url: "/rider/me",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    })
  }),
});

export const { useCreateriderMutation, useRiderInfoQuery } = riderApi;