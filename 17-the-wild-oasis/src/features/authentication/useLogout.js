import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "@src/services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: 1 });
      toast.success("Logout successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { logout, isLoading };
}
