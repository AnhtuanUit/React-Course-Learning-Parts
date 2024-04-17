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
    retry: false,
  });

  return {
    user: user?.user,
    isLoading,
    isAuthenticated:
      user?.user?.role === "authenticated" &&
      !(error?.message === "User session not found"),
  };
}
