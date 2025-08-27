import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create driver profile
    createDriver: builder.mutation({
      query: (driverInfo) => ({
        url: "/driver/create-profile",
        method: "POST",
        body: driverInfo,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // ✅ Get own driver profile
    driverInfo: builder.query({
      query: () => ({
        url: "/driver/me",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    // ✅ Update own driver profile
    updateDriver: builder.mutation({
      query: (updateData) => ({
        url: "/driver/me",
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // ✅ Update availability status
    setAvailability: builder.mutation({
      query: (availabilityData) => ({
        url: "/driver/availability",
        method: "PATCH",
        body: availabilityData,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // ✅ Get all drivers (admin only)
    getAllDrivers: builder.query({
      query: () => ({
        url: "/driver/admin",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    // ✅ Admin update driver profile
    adminUpdateDriver: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/driver/admin/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // ✅ Get driver by ID
    getDriverById: builder.query({
      query: (id) => ({
        url: `/driver/${id}`,
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),
  }),
});

export const {
  useCreateDriverMutation,
  useDriverInfoQuery,
  useUpdateDriverMutation,
  useSetAvailabilityMutation,
  useGetAllDriversQuery,
  useAdminUpdateDriverMutation,
  useGetDriverByIdQuery,
} = driverApi;
