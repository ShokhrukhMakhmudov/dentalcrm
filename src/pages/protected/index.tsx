import { ReactNode, useEffect } from "react";
import { useAuthContext } from "../../context";
import { useNavigate } from "@tanstack/react-router";

export default function ProtectedPage({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (user === null) {
      navigate({ to: "/login" });
    }
  }, []);

  return <>{children}</>;
}
