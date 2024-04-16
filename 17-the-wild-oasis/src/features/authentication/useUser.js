import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@src/services/apiAuth";

export function useUser() {
  const {
    data: user,
    error,
    isPending: isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    error,
    isAuthenticated: user?.user?.role === "authenticated",
  };
}
