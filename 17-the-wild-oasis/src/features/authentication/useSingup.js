import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "@src/services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: signup,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi(email, password, fullName),
    onSuccess: () => {
      toast.success("Signup successfully");
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

  return { signup, isLoading, error };
}
