import { apiSlice } from '../../app/api/apiSlice'

export const appointmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get appointments
    getAppointments: builder.query({
      query: ({ userId }) => {
        return {
          url: `/appointments/${userId}`,
        }
      },
      providesTags: ['Appointments'],
    }),
    //Add appointments
    addAppointments: builder.mutation({
      query: ({ supervisorId, startTime, endTime, userId }) => {
        return {
          url: `/appointments/${userId}`,
          method: 'POST',
          body: { startTime, endTime, supervisorId },
        }
      },
      invalidatesTags: ['Appointments'],
    }),
  }),
})

export const { useGetAppointmentsQuery, useAddAppointmentsMutation } =
  appointmentsApiSlice
