import { updateBooking } from "@src/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function useCheckIn() {
  const { bookingID } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: checkin,
    isPending: isCheckingIn,
    error,
  } = useMutation({
    mutationFn: () =>
      updateBooking(bookingID, { status: "checked-in", isPaid: true }),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings", "booking", bookingID],
      });
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkin, isCheckingIn, error };
}

export default useCheckIn;
