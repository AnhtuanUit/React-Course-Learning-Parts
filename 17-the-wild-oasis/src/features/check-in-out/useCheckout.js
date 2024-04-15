import { updateBooking } from "@src/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: checkout,
    isPending: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: (bookingID) => {
      updateBooking(bookingID, {
        status: "checked-out",
      });
    },
    onSuccess: () => {
      toast.success("Booking successfully check out");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkout, isCheckingOut, error };
}

export default useCheckout;
