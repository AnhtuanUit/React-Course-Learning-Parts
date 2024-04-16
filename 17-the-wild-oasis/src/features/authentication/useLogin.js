import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@src/services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: () => {
      toast.success("Login successfully");
      navigate("/");
      queryClient.invalidateQueries({
        queryKey: "user",
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { login, isLoading, error };
}
