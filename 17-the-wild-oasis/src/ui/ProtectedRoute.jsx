import { useUser } from "@src/features/authentication/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate, isLoading]
  );

  // 3. While loading, show a spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
