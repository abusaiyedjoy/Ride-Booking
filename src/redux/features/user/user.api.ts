import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Register new user
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    // ✅ Get all users (Admin, Super Admin only)
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // ✅ Get logged in user's info
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // ✅ Get single user (Admin, Super Admin only)
    getSingleUser: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // ✅ Update user
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const { 
  useRegisterMutation,
  useGetAllUsersQuery,
  useUserInfoQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation
} = userApi;
