import { getStaysTodayActivity } from "@src/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useTodayActivity() {
  const {
    isLoading,
    data: activities,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getStaysTodayActivity(),
  });

  return { activities, isLoading, error };
}

export default useTodayActivity;
