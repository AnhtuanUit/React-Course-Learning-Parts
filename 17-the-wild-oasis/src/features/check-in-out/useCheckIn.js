import { updateBooking } from "@src/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function useCheckin() {
  const { bookingID } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: checkin,
    isPending: isCheckingIn,
    error,
  } = useMutation({
    mutationFn: (breakfast) => {
      updateBooking(bookingID, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess: () => {
      toast.success("Booking successfully check in");
      queryClient.invalidateQueries({
        queryKey: ["bookings", "booking", bookingID],
      });
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkin, isCheckingIn, error };
}

export default useCheckin;
