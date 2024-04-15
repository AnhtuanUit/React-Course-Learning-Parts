import { deleteBooking as deleteBookingApi } from "@src/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteBooking,
    isPendding: isDeleting,
    error,
  } = useMutation({
    mutationFn: (bookingId) => {
      deleteBookingApi(bookingId);
    },
    onSuccess: () => {
      toast.success("Booking successfully deleted");

      queryClient.invalidateQueries("bookings");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteBooking, isDeleting, error };
}

export default useDeleteBooking;
