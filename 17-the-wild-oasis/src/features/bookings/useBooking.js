import { useQuery } from "@tanstack/react-query";

import { getBooking } from "@src/services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingID } = useParams();

  const {
    isPending: isLoading,
    data: booking = {},
    error,
  } = useQuery({
    queryKey: ["booking", bookingID],
    queryFn: () => getBooking(bookingID),
    retry: false,
  });

  return { isLoading, booking, error };
}
