import { baseApi } from "@/redux/baseApi";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create rider profile
    createRider: builder.mutation({
      query: (riderInfo) => ({
        url: "/rider/create-profile",
        method: "POST",
        body: riderInfo, 
      }),
      invalidatesTags: ["RIDER"],
    }),

    // Get own rider profile
    riderInfo: builder.query({
      query: () => ({
        url: "/rider/me",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),

    // Update own rider profile
    updateRider: builder.mutation({
      query: (updatedInfo) => ({
        url: "/rider/me",
        method: "PATCH",
        body: updatedInfo,
      }),
      invalidatesTags: ["RIDER"],
    }),

    // Get all riders (admin/super_admin only)
    getAllRiders: builder.query({
      query: () => ({
        url: "/rider/admin",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),

    // Get single rider by ID (admin/super_admin only)
    getRiderById: builder.query({
      query: (id) => ({
        url: `/rider/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),
  }),
});

export const {
  useCreateRiderMutation,
  useRiderInfoQuery,
  useUpdateRiderMutation,
  useGetAllRidersQuery,
  useGetRiderByIdQuery,
} = riderApi;
